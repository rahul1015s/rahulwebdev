import { connectDB } from '@/lib/mongodb'
import Tag from '@/models/tag'
import { NextRequest, NextResponse } from 'next/server'

// GET all tags
export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const tags = await Tag.find({}).sort({ name: 1 })
    return NextResponse.json(tags, { status: 200 })
  } catch (error: any) {
    console.error('GET /api/tags error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST create tag
export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { name, description } = await req.json()

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Tag name must be at least 2 characters' },
        { status: 400 }
      )
    }

    const nameLower = name.toLowerCase().trim()

    // Check if exists (case-insensitive)
    const existing = await Tag.findOne({ name: nameLower })

    if (existing) {
      return NextResponse.json(
        { error: 'Tag already exists' },
        { status: 409 }
      )
    }

    const tag = await Tag.create({
      name: nameLower,
      description,
    })

    return NextResponse.json(tag, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/tags error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
