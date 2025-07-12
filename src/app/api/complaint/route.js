import { prisma } from '@/src/lib/prisma';
import { NextResponse } from 'next/server';

// GET all complaints
export async function GET() {
  try {
    const records = await prisma.complaint.findMany({
      orderBy: { created_at: 'desc' }
    });
    return NextResponse.json({ success: true, data: records });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST create complaint
export async function POST(req) {
  try {
    const body = await req.json();
    const record = await prisma.complaint.create({ data: body });
    return NextResponse.json({ success: true, data: record }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create' }, { status: 500 });
  }
} 