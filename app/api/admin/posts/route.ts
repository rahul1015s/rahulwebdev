import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/post'
import { normalizeImageUrl } from '@/utils/url-utils'

export async function GET(req: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'

    let query: any = {}

    // Add search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ]
    }

    // Add status filter
    if (status === 'published') {
      query.published = true
    } else if (status === 'draft') {
      query.published = false
    }

    const posts = await Post.find(query).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ ok: true, posts })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, slug: incomingSlug, content, image, published = false } = body
    if (!title) return NextResponse.json({ ok: false, error: 'title required' }, { status: 400 })

    // Auto-generate slug from title when not provided
    const slugify = (s: string) =>
      s
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')

    let slug = incomingSlug && String(incomingSlug).trim() ? String(incomingSlug).trim() : slugify(title)

    await connectDB()

    // Ensure slug uniqueness — append short suffix if needed
    let existing = await Post.findOne({ slug })
    if (existing) {
      const suffix = Math.random().toString(36).slice(2, 8)
      slug = `${slug}-${suffix}`
      existing = await Post.findOne({ slug })
      // very unlikely to collide twice; if it does, let save fail and return error
    }

    const normImage = image ? normalizeImageUrl(String(image)) : undefined
    const doc = new Post({ title, slug, content, image: normImage, published })
    await doc.save()
    return NextResponse.json({ ok: true, post: doc })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 })
  }
}

