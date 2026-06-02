import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { successResponse, errorResponse, handleApiError } from '@/lib/api-response';

// TODO: Integrate with actual Stripe SDK
// For now, this is a placeholder that shows the flow

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return errorResponse('Unauthorized', 401, 'User ID not found');
    }

    const body = await request.json();
    const { bookingId, amount, paymentMethodId } = body;

    if (!bookingId || !amount || !paymentMethodId) {
      return errorResponse(
        'Missing required fields: bookingId, amount, paymentMethodId',
        400,
        'Validation error'
      );
    }

    // Verify booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking || booking.userId !== userId) {
      return errorResponse(
        'Booking not found or permission denied',
        404,
        'Not found'
      );
    }

    // TODO: Process payment with Stripe
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(amount * 100),
    //   currency: 'usd',
    //   payment_method: paymentMethodId,
    //   confirm: true,
    // });

    // For demo purposes, create payment record
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        userId,
        amount,
        paymentType: 'ADVANCE',
        paymentMethod: 'STRIPE',
        status: 'ADVANCE_PAID',
        stripePaymentId: `pi_demo_${Date.now()}`, // Should be actual Stripe ID
        transactionId: `txn_${Date.now()}`,
      },
    });

    // Update booking status
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        paymentStatus: 'ADVANCE_PAID',
        status: 'CONFIRMED',
      },
    });

    return successResponse(
      {
        payment,
        status: 'success',
        message: 'Payment processed successfully',
      },
      'Payment completed',
      200
    );
  } catch (error) {
    return handleApiError(error, 'Failed to process Stripe payment');
  }
}

export async function GET(request: NextRequest) {
  try {
    const paymentIntentId = request.nextUrl.searchParams.get('paymentIntentId');

    if (!paymentIntentId) {
      return errorResponse(
        'paymentIntentId is required',
        400,
        'Validation error'
      );
    }

    // TODO: Get payment status from Stripe
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return successResponse(
      {
        status: 'succeeded',
        amount: 0,
      },
      'Payment status retrieved'
    );
  } catch (error) {
    return handleApiError(error, 'Failed to retrieve payment status');
  }
}
