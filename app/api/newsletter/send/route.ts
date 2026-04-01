import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';
import emailService from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Simple auth check (you should implement proper authentication)
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.ADMIN_TOKEN || process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'admin-token';
    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { subject, content } = await request.json();

    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Subject and content are required' },
        { status: 400 }
      );
    }

    // Get active subscribers
    const subscribers = await Subscriber.find({ 
      isActive: true,
      confirmedAt: { $exists: true }
    });

    let sentCount = 0;
    let failedCount = 0;

    // Send to each subscriber
    for (const subscriber of subscribers) {
      try {
        const success = await emailService.sendNewsletter(
          subscriber.email,
          subscriber.name || 'Subscriber',
          content,
          subject
        );

        if (success) {
          sentCount++;
          // Update last email sent
          subscriber.lastEmailSent = new Date();
          await subscriber.save();
        } else {
          failedCount++;
        }
      } catch (error) {
        console.error(`Failed to send to ${subscriber.email}:`, error);
        failedCount++;
      }
    }

    return NextResponse.json({
      message: 'Newsletter sent successfully',
      stats: {
        total: subscribers.length,
        sent: sentCount,
        failed: failedCount
      }
    });

  } catch (error) {
    console.error('Send newsletter error:', error);
    return NextResponse.json(
      { error: 'Failed to send newsletter' },
      { status: 500 }
    );
  }
}