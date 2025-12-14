import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/?error=invalid', req.url));
    }

    const subscriber = await Subscriber.findOne({
      confirmationToken: token,
    });

    if (!subscriber) {
      return NextResponse.redirect(new URL('/?error=not-found', req.url));
    }

    if (subscriber.confirmedAt) {
      return NextResponse.redirect(
        new URL('/?success=already-confirmed', req.url)
      );
    }

    subscriber.confirmedAt = new Date();
    subscriber.confirmationToken = undefined;
    subscriber.isActive = true;

    await subscriber.save();

    return NextResponse.redirect(
      new URL('/?success=confirmed', req.url)
    );
  } catch (error) {
    console.error('Confirm error:', error);
    return NextResponse.redirect(
      new URL('/?error=failed', req.url)
    );
  }
}

