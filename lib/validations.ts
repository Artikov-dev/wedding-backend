import { z } from 'zod';

// ==================== AUTH SCHEMAS ====================

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  role: z.enum(['ADMIN', 'HALL_OWNER', 'SERVICE_PROVIDER', 'CUSTOMER']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const verifyOtpSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  code: z.string().min(6, 'OTP must be 6 digits'),
  purpose: z.enum(['email_verification', 'phone_verification', 'password_reset']),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  code: z.string().min(6, 'OTP must be 6 digits'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// ==================== USER SCHEMAS ====================

export const updateProfileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').optional(),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').optional(),
  phone: z.string().min(10, 'Phone must be at least 10 digits').optional(),
  profileImage: z.string().optional(),
});

export const updateAddressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  country: z.string().min(1, 'Country is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

// ==================== HALL SCHEMAS ====================

export const createHallSchema = z.object({
  name: z.string().min(1, 'Hall name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum(['LUXURY', 'PREMIUM', 'STANDARD', 'BUDGET']).optional(),
  capacity: z.number().min(10, 'Capacity must be at least 10').max(10000),
  pricePerPlate: z.number().min(0, 'Price must be positive'),
  advancePercentage: z.number().min(0).max(100).optional(),
  imageUrl: z.string().optional(),
  amenities: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
  })).optional(),
});

export const updateHallSchema = createHallSchema.partial();

export const addHallAmenitySchema = z.object({
  name: z.string().min(1, 'Amenity name is required'),
  description: z.string().optional(),
});

export const addHallServiceSchema = z.object({
  serviceType: z.enum(['SINGER', 'CAR', 'MENU', 'KARNAY']),
  price: z.number().min(0, 'Price must be positive'),
  description: z.string().optional(),
});

// ==================== SERVICE PROVIDER SCHEMAS ====================

export const createServiceProviderSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  serviceType: z.enum(['SINGER', 'CAR', 'MENU', 'KARNAY', 'DECORATION', 'PHOTOGRAPHY', 'VIDEOGRAPHY']),
  pricing: z.number().min(0, 'Price must be positive'),
  imageUrl: z.string().optional(),
});

export const updateServiceProviderSchema = createServiceProviderSchema.partial();

// ==================== BOOKING SCHEMAS ====================

export const createBookingSchema = z.object({
  hallId: z.string().min(1, 'Hall ID is required'),
  eventDate: z.string().datetime('Invalid date format'),
  eventTime: z.string().min(1, 'Event time is required'),
  numberOfGuests: z.number().min(1, 'Must have at least 1 guest').max(10000),
  notes: z.string().optional(),
  services: z.array(z.object({
    serviceProviderId: z.string(),
    quantity: z.number().min(1).optional(),
  })).optional(),
});

export const updateBookingSchema = z.object({
  eventDate: z.string().datetime().optional(),
  eventTime: z.string().optional(),
  numberOfGuests: z.number().min(1).optional(),
  notes: z.string().optional(),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'REFUNDED']),
});

// ==================== PAYMENT SCHEMAS ====================

export const createPaymentSchema = z.object({
  bookingId: z.string().min(1, 'Booking ID is required'),
  paymentType: z.enum(['ADVANCE', 'FINAL', 'SERVICE']),
  paymentMethod: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'CASH', 'STRIPE']),
  amount: z.number().min(0, 'Amount must be positive'),
});

export const processStripePaymentSchema = z.object({
  bookingId: z.string().min(1, 'Booking ID is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  paymentMethodId: z.string().min(1, 'Payment method ID is required'),
});

// ==================== REVIEW SCHEMAS ====================

export const createReviewSchema = z.object({
  rating: z.number().min(1, 'Rating must be between 1-5').max(5),
  comment: z.string().optional(),
  hallId: z.string().optional(),
  serviceProviderId: z.string().optional(),
});

// ==================== INVITATION SCHEMAS ====================

export const createInvitationSchema = z.object({
  bookingId: z.string().min(1, 'Booking ID is required'),
  guestEmails: z.array(z.string().email('Invalid email')).min(1),
  message: z.string().optional(),
  guestCount: z.number().min(1).optional(),
});

export const updateInvitationStatusSchema = z.object({
  status: z.enum(['PENDING', 'ACCEPTED', 'DECLINED']),
});

// ==================== CHAT SCHEMAS ====================

export const sendMessageSchema = z.object({
  conversationId: z.string().min(1, 'Conversation ID is required'),
  content: z.string().min(1, 'Message content is required'),
});

export const startConversationSchema = z.object({
  participantIds: z.array(z.string()).min(2, 'At least 2 participants required'),
});

// ==================== SEARCH & FILTER SCHEMAS ====================

export const hallSearchSchema = z.object({
  city: z.string().optional(),
  capacity: z.number().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  amenities: z.array(z.string()).optional(),
  category: z.enum(['LUXURY', 'PREMIUM', 'STANDARD', 'BUDGET']).optional(),
  rating: z.number().min(1).max(5).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export const bookingFilterSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'REFUNDED']).optional(),
  paymentStatus: z.enum(['PENDING', 'ADVANCE_PAID', 'FINAL_PAID', 'REFUNDED', 'FAILED']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateHallInput = z.infer<typeof createHallSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type HallSearchInput = z.infer<typeof hallSearchSchema>;
