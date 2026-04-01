import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/post'
import { normalizeImageUrl } from '@/utils/url-utils'

export async function GET(req: Request, { params }: { params: any }) {
  try {
    const { id } = await params
    await connectDB()
    const post = await Post.findById(id).lean()
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

    await connectDB()
    const updated = await Post.findByIdAndUpdate(id, update, { new: true })
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
