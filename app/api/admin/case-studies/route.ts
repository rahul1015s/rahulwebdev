import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import CaseStudy from '@/models/casestudy'
import { normalizeImageUrl } from '@/utils/url-utils'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const all = searchParams.get('all') === 'true'

    await connectDB()

    const query = all ? {} : { published: true }
    const caseStudies = await CaseStudy.find(query).sort({ order: 1, createdAt: -1 }).lean()

    return NextResponse.json({ ok: true, caseStudies })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
      const body = await request.json()
      const { title, name: incomingName, excerpt, content, coverImage, images = [], tags = [], published = false } = body

      const name = incomingName || title
      if (!name) {
        return NextResponse.json({ ok: false, error: 'Missing required fields: name/title' }, { status: 400 })
      }

    await connectDB()

    const slugify = (s: string) =>
      s
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')

    let slug = body.slug || slugify(name)
    
    // Check for existing slug and generate unique one if needed
    let counter = 1
    const originalSlug = slug
    let existing = await CaseStudy.findOne({ slug })
    
    while (existing) {
      slug = `${originalSlug}-${counter}`
      existing = await CaseStudy.findOne({ slug })
      counter++
    }

    const normCover = coverImage ? normalizeImageUrl(String(coverImage)) : undefined
    const normImages = Array.isArray(images) ? images.map((u: any) => normalizeImageUrl(String(u))) : []

    // Map incoming fields to CaseStudy schema: name, tagline, description, gallery
    const record = new CaseStudy({
      name,
      slug,
      tagline: excerpt || '',
      description: excerpt || '',
      content,
      coverImage: normCover,
      gallery: normImages,
      stack: tags || [],
      published
    })
    await record.save()

    return NextResponse.json({ ok: true, caseStudy: record })
  } catch (error: any) {
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      return NextResponse.json({ ok: false, error: `${field} already exists` }, { status: 400 })
    }
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
}
