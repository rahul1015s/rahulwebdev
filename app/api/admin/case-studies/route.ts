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
      const { 
        name, 
        slug, 
        tagline, 
        description, 
        content, 
        coverImage, 
        gallery = [], 
        stack = [], 
        liveUrl, 
        githubUrl, 
        featured = false, 
        category = [], 
        deliverables = [], 
        timeline, 
        client, 
        team = [], 
        challenges = [], 
        solutions = [], 
        results = [], 
        published = false, 
        order = 0 
      } = body

      if (!name) {
        return NextResponse.json({ ok: false, error: 'Missing required field: name' }, { status: 400 })
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

    let finalSlug = slug || slugify(name)
    
    // Check for existing slug and generate unique one if needed
    let counter = 1
    const originalSlug = finalSlug
    let existing = await CaseStudy.findOne({ slug: finalSlug })
    
    while (existing) {
      finalSlug = `${originalSlug}-${counter}`
      existing = await CaseStudy.findOne({ slug: finalSlug })
      counter++
    }

    const normCover = coverImage ? normalizeImageUrl(String(coverImage)) : undefined
    const normGallery = Array.isArray(gallery) ? gallery.map((u: any) => normalizeImageUrl(String(u))) : []

    const record = new CaseStudy({
      name,
      slug: finalSlug,
      tagline,
      description,
      content,
      coverImage: normCover,
      gallery: normGallery,
      stack,
      liveUrl,
      githubUrl,
      featured,
      category,
      deliverables,
      timeline,
      client,
      team,
      challenges,
      solutions,
      results,
      published,
      order
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
