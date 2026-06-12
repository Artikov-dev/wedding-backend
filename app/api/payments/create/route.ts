import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { createPaymentSchema } from '@/lib/validations';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

function generateInvoiceNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `INV${timestamp}${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const body = await request.json();

    // Validate input
    const validationResult = createPaymentSchema.safeParse(body);
    if (!validationResult.success) {
      const details = validationResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return errorResponse(
        `Validation error: ${details}`,
        400,
        'Validation error'
      );
    }

    const { bookingId, paymentType, paymentMethod, amount } = validationResult.data;

    // Verify booking exists and belongs to user
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { hall: true },
    });

    if (!booking) {
      return errorResponse('Booking not found', 404, 'Booking does not exist');
    }

    if (booking.userId !== userId) {
      return errorResponse('You do not have permission to make payment for this booking', 403, 'Forbidden');
    }

    // Validate payment amount with tolerance for floating point differences
    if (paymentType === 'ADVANCE' && Math.abs(amount - Number(booking.advanceAmount)) > 0.01) {
      return errorResponse(
        `Advance amount should be ${booking.advanceAmount}`,
        400,
        'Invalid amount'
      );
    }

    if (paymentType === 'FINAL' && Math.abs(amount - Number(booking.finalAmount)) > 0.01) {
      return errorResponse(
        `Final amount should be ${booking.finalAmount}`,
        400,
        'Invalid amount'
      );
    }

    // Check payment status
    if (paymentType === 'FINAL' && booking.paymentStatus !== 'ADVANCE_PAID') {
      return errorResponse(
        'Advance payment must be completed before final payment',
        400,
        'Advance payment pending'
      );
    }

    // Non-stripe payments (CASH, BANK_TRANSFER, etc.) are considered immediately completed;
    // STRIPE stays PENDING until webhook confirmation.
    const paymentStatus = paymentMethod === 'STRIPE' ? 'PENDING' : 'COMPLETED';

    // Create payment
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        userId,
        amount,
        paymentType,
        paymentMethod,
        status: paymentStatus,
      },
    });

    // Create invoice
    const invoice = await prisma.invoice.create({
      data: {
        paymentId: payment.id,
        bookingId,
        invoiceNumber: generateInvoiceNumber(),
        amount,
        finalAmount: amount,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    // Update booking status based on payment type — only when payment is completed
    let newPaymentStatus = booking.paymentStatus;
    let newBookingStatus = booking.status;

    if (paymentType === 'ADVANCE') {
      newPaymentStatus = 'ADVANCE_PAID';
      newBookingStatus = 'CONFIRMED';
    } else if (paymentType === 'FINAL') {
      newPaymentStatus = 'FINAL_PAID';
      newBookingStatus = 'COMPLETED';
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        paymentStatus: newPaymentStatus,
        status: newBookingStatus,
      },
    });

    // Create notification for hall owner
    await prisma.notification.create({
      data: {
        userId: booking.hall.userId,
        type: 'PAYMENT_RECEIVED',
        title: 'Payment Received',
        message: `Payment of ${amount} received for booking ${booking.bookingNumber}`,
        relatedId: payment.id,
      },
    });

    return successResponse(
      {
        payment,
        invoice,
      },
      'Payment initiated successfully',
      201
    );
  } catch (error) {
    return handleApiError(error, 'Failed to create payment');
  }
}
