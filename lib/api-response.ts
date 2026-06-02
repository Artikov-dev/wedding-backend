import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
}

/**
 * Send success response
 */
export function successResponse<T>(
  data: T,
  message: string = 'Success',
  statusCode: number = 200,
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
      statusCode,
    },
    { status: statusCode }
  );
}

/**
 * Send error response
 */
export function errorResponse(
  error: string,
  statusCode: number = 400,
  message?: string,
): NextResponse<ApiResponse<null>> {
  return NextResponse.json(
    {
      success: false,
      error,
      message: message || error,
      statusCode,
    },
    { status: statusCode }
  );
}

/**
 * Handle API errors
 */
export function handleApiError(error: any, defaultMessage: string = 'Internal Server Error'): NextResponse<ApiResponse<null>> {
  console.error('[API Error]', error);

  if (error?.code === 'P2002') {
    return errorResponse('This record already exists', 409, 'Duplicate entry');
  }

  if (error?.code === 'P2025') {
    return errorResponse('Record not found', 404, 'Not found');
  }

  if (error?.message?.includes('ValidationError')) {
    return errorResponse(error.message, 400, 'Validation error');
  }

  return errorResponse(defaultMessage, 500);
}
