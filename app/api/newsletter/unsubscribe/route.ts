import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const email = request.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.redirect(new URL('/?error=no-email', request.url));
    }

    const subscriber = await Subscriber.findOne({ email: email.toLowerCase() });

    if (!subscriber) {
      return NextResponse.redirect(new URL('/?error=not-subscribed', request.url));
    }

    // Unsubscribe
    subscriber.isActive = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    return NextResponse.redirect(new URL('/?success=unsubscribed', request.url));

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.redirect(new URL('/?error=unsubscribe-failed', request.url));
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const subscriber = await Subscriber.findOne({ email: email.toLowerCase() });

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Email not found in our subscription list' },
        { status: 404 }
      );
    }

    // Unsubscribe
    subscriber.isActive = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    return NextResponse.json(
      { message: 'You have been unsubscribed successfully.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
