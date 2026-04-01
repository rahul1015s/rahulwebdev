import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/post'
import CaseStudy from '@/models/casestudy'
import Subscriber from '@/models/Subscriber'

export async function GET() {
  try {
    await connectDB()

    // Get post stats
    const totalPosts = await Post.countDocuments()
    const publishedPosts = await Post.countDocuments({ published: true })

    // Get case study stats
    const totalCaseStudies = await CaseStudy.countDocuments()
    const publishedCaseStudies = await CaseStudy.countDocuments({ published: true })

    // Get subscriber stats
    const totalSubscribers = await Subscriber.countDocuments()
    const activeSubscribers = await Subscriber.countDocuments({ isActive: true })

    // For now, newsletter sent count is hardcoded as we don't have a newsletter log
    // In a real app, you'd have a Newsletter model to track sends
    const newslettersSent = 0

    // Calculate open rate (would need tracking pixels in emails)
    const openRate = 0

    return NextResponse.json({
      ok: true,
      stats: {
        posts: {
          total: totalPosts,
          published: publishedPosts,
          drafts: totalPosts - publishedPosts
        },
        caseStudies: {
          total: totalCaseStudies,
          published: publishedCaseStudies,
          drafts: totalCaseStudies - publishedCaseStudies
        },
        subscribers: {
          total: totalSubscribers,
          active: activeSubscribers
        },
        newsletters: {
          sent: newslettersSent,
          openRate: openRate
        }
      }
    })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 })
  }
}