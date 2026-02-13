import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/post'
import Category from '@/models/category'
import Tag from '@/models/tag'
import { normalizeImageUrl } from '@/utils/url-utils'

export async function GET(req: Request, { params }: { params: any }) {
  try {
    const { id } = await params
    await connectDB()
    const post = await Post.findById(id).populate('category').populate('tags').lean()
    if (!post) return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 })
    return NextResponse.json({ ok: true, post })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: any }) {
  try {
    const { id } = await params
    const body = await req.json()
    const update: any = {}

    if (body.title !== undefined) update.title = body.title
    if (body.slug !== undefined) update.slug = body.slug
    if (body.content !== undefined) update.content = body.content
    if (body.published !== undefined) update.published = body.published
    if (body.image !== undefined) update.image = body.image ? normalizeImageUrl(String(body.image)) : undefined
    if (body.metaTitle !== undefined) update.metaTitle = body.metaTitle
    if (body.metaDescription !== undefined) update.metaDescription = body.metaDescription
    if (body.readTime !== undefined) update.readTime = body.readTime

    await connectDB()

    // Validate and update category
    if (body.category !== undefined) {
      if (body.category) {
        const categoryDoc = await Category.findById(body.category)
        if (!categoryDoc) {
          return NextResponse.json({ ok: false, error: 'Invalid category' }, { status: 400 })
        }
        update.category = categoryDoc._id
      } else {
        update.category = null
      }
    }

    // Validate and update tags
    if (body.tags !== undefined) {
      if (Array.isArray(body.tags) && body.tags.length > 0) {
        const validTags = await Tag.find({ _id: { $in: body.tags } })
        if (validTags.length !== body.tags.length) {
          return NextResponse.json({ ok: false, error: 'One or more tags are invalid' }, { status: 400 })
        }
        update.tags = validTags.map(t => t._id)
      } else {
        update.tags = []
      }
    }

    const updated = await Post.findByIdAndUpdate(id, update, { new: true }).populate('category').populate('tags')
    if (!updated) return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 })
    return NextResponse.json({ ok: true, post: updated })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: any }) {
  try {
    const { id } = await params
    await connectDB()
    const deleted = await Post.findByIdAndDelete(id)
    if (!deleted) return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 })
  }
}
