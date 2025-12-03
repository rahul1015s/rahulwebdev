import { NextResponse } from 'next/server'
import connectMongoose from '@/lib/mongoose'
import Post from '@/models/post'

export async function GET() {
  try {
    await connectMongoose()
    const posts = await Post.find().sort({ createdAt: -1 }).lean()
    return NextResponse.json({ ok: true, posts })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, slug: incomingSlug, content, published = false } = body
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

    await connectMongoose()

    // Ensure slug uniqueness — append short suffix if needed
    let existing = await Post.findOne({ slug })
    if (existing) {
      const suffix = Math.random().toString(36).slice(2, 8)
      slug = `${slug}-${suffix}`
      existing = await Post.findOne({ slug })
      // very unlikely to collide twice; if it does, let save fail and return error
    }

    const doc = new Post({ title, slug, content, published })
    await doc.save()
    return NextResponse.json({ ok: true, post: doc })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 })
  }
}
