import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { CloudCog } from 'lucide-react';
import { Console } from 'console';

// POST - Save application
export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body, 'hi how are S');
    
    const { name, city,email, phone_number, last_education, intrested_country } = body;

    const newApplication = await prisma.apply_now.create({
      data: {
        name,
        city,
        email,
        phone_number,
        last_education,
        intrested_country,
        
      },
    });

    return NextResponse.json({ success: true, data: newApplication }, { status: 201 });
  } catch (error) {
    console.error("POST /api/applyNow error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// GET - Fetch all applications
export async function GET() {
  try {
    const applications = await prisma.apply_now.findMany({
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json({ success: true, data: applications }, { status: 200 });
  } catch (error) {
    console.error("GET /api/applyNow error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
