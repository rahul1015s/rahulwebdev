import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';
import emailService from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, name, source = 'website' } = await req.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    let subscriber = await Subscriber.findOne({
      email: email.toLowerCase(),
    });

    // Already subscribed and active
    if (subscriber?.isActive) {
      return NextResponse.json({
        message: 'You are already subscribed',
      });
    }

    // Existing subscriber (activate immediately)
    if (subscriber) {
      subscriber.confirmedAt = new Date();
      subscriber.confirmationToken = undefined;
      subscriber.isActive = true;
      await subscriber.save();
    }
    // New subscriber
    else {
      subscriber = await Subscriber.create({
        email: email.toLowerCase(),
        name,
        source,
        isActive: true,
      });
    }

    // Send welcome email
    await emailService.sendWelcomeEmail(
      subscriber.email,
      subscriber.name
    );

    return NextResponse.json({
      message: 'Successfully subscribed to the newsletter!',
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
