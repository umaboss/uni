import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma"; 
// Handle POST request - Create a new message
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      office_location,
      user_name,
      user_email,
      phone_number,
      message,
    } = body;

    const newMessage = await prisma.contact_us_messages.create({
      data: {
        office_location,
        user_name,
        user_email,
        phone_number,
        message,
      },
    });

    return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
  } catch (error) {
    console.error("POST /api/contactUs error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await prisma.contact_us_messages.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({ success: true, data: messages }, { status: 200 });
  } catch (error) {
    console.error("GET /api/contactUs error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch messages", error }, { status: 500 });
  }
}
