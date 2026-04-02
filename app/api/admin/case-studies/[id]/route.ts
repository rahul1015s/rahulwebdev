import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import CaseStudy from '@/models/casestudy'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    // Only use _id lookup when id looks like a 24-char hex ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id)
    const query: any = isObjectId ? { $or: [{ _id: id }, { slug: id }] } : { slug: id }
    const caseStudy = await CaseStudy.findOne(query).lean()
    
    if (!caseStudy) {
      return NextResponse.json(
        { ok: false, error: 'Case study not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ ok: true, caseStudy })
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    const updates = await request.json()
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id)
    const query: any = isObjectId ? { $or: [{ _id: id }, { slug: id }] } : { slug: id }

    // Normalize incoming images when provided in updates
    if (updates.coverImage) {
      const { normalizeImageUrl } = await import('@/utils/url-utils')
      updates.coverImage = normalizeImageUrl(String(updates.coverImage))
    }
    if (updates.gallery && Array.isArray(updates.gallery)) {
      const { normalizeImageUrl } = await import('@/utils/url-utils')
      updates.gallery = updates.gallery.map((u: any) => normalizeImageUrl(String(u)))
    }

    const caseStudy = await CaseStudy.findOneAndUpdate(query, { $set: updates }, { new: true })
    
    if (!caseStudy) {
      return NextResponse.json(
        { ok: false, error: 'Case study not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ ok: true, caseStudy })
  } catch (error: any) {
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      return NextResponse.json(
        { ok: false, error: `${field} already exists` },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id)
    const query: any = isObjectId ? { $or: [{ _id: id }, { slug: id }] } : { slug: id }

    const caseStudy = await CaseStudy.findOneAndDelete(query)
    
    if (!caseStudy) {
      return NextResponse.json(
        { ok: false, error: 'Case study not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    )
  }
}