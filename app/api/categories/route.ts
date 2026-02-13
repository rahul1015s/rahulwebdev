import { connectDB } from '@/lib/mongodb'
import Category from '@/models/category'
import { NextRequest, NextResponse } from 'next/server'

// GET all categories
export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const categories = await Category.find({}).sort({ name: 1 })
    return NextResponse.json(categories, { status: 200 })
  } catch (error: any) {
    console.error('GET /api/categories error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST create category
export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const { name, description, icon } = await req.json()

    if (!name || name.trim().length < 3) {
      return NextResponse.json(
        { error: 'Category name must be at least 3 characters' },
        { status: 400 }
      )
    }

    // Check if exists (case-insensitive)
    const existing = await Category.findOne({
      name: new RegExp(`^${name}$`, 'i'),
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Category already exists' },
        { status: 409 }
      )
    }

    const category = await Category.create({
      name,
      description,
      icon,
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/categories error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
