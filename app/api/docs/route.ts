import { NextResponse } from 'next/server';
import openapiDocument from '../../../openapi.json';

export async function GET() {
  return NextResponse.json(openapiDocument, {
    status: 200,
  });
}
