import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, projectType, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json(
      { success: true, message: 'Message received! We will contact you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process your message. Please try again.' },
      { status: 500 }
    );
  }
}
