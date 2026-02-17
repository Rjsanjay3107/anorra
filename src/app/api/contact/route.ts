import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    const emailContent = `
New Enquiry from Anorra Website

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}

---
Received: ${new Date().toISOString()}
    `.trim();

    console.log('=== NEW ENQUIRY ===');
    console.log(emailContent);
    console.log('===================');

    return NextResponse.json({ 
      success: true, 
      message: 'Enquiry submitted successfully' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
