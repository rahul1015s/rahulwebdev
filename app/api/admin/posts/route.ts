import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Post from '@/models/post'
import Category from '@/models/category'
import Tag from '@/models/tag'
import { normalizeImageUrl } from '@/utils/url-utils'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function GET(req: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const category = searchParams.get('category') || ''

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

    // Add category filter
    if (category) {
      const cat = await Category.findOne({ slug: category })
      if (cat) {
        query.category = cat._id
      }
    }

    const posts = await Post.find(query).sort({ createdAt: -1 }).populate('category').populate('tags').lean()
    return NextResponse.json({ ok: true, posts })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { 
      title, 
      slug: incomingSlug, 
      content, 
      image, 
      published = false,
      category,        // NEW: Category ObjectId
      tags = [],       // NEW: Array of Tag ObjectIds
      metaTitle,       // NEW: SEO field
      metaDescription, // NEW: SEO field
      readTime
    } = body

    if (!title) return NextResponse.json({ ok: false, error: 'title required' }, { status: 400 })
    if (!content) return NextResponse.json({ ok: false, error: 'content required' }, { status: 400 })

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
    }

    // Validate category if provided
    let categoryId = null
    if (category) {
      const categoryDoc = await Category.findById(category)
      if (!categoryDoc) {
        return NextResponse.json({ ok: false, error: 'Invalid category' }, { status: 400 })
      }
      categoryId = categoryDoc._id
    }

    // Validate tags if provided
    let tagIds: any[] = []
    if (tags && Array.isArray(tags) && tags.length > 0) {
      const validTags = await Tag.find({ _id: { $in: tags } })
      if (validTags.length !== tags.length) {
        return NextResponse.json({ ok: false, error: 'One or more tags are invalid' }, { status: 400 })
      }
      tagIds = validTags.map(t => t._id)
    }

    const normImage = image ? normalizeImageUrl(String(image)) : undefined
    const doc = new Post({
      title,
      slug,
      content,
      image: normImage,
      published,
      category: categoryId,
      tags: tagIds,
      metaTitle: metaTitle || title, // Default to title if not provided
      metaDescription: metaDescription || '',
      readTime
    })
    
    await doc.save()
    const populated = await Post.findById(doc._id).populate('category').populate('tags')
    revalidateTag('blog-posts')
    revalidatePath('/blog')
    if (populated?.slug) revalidatePath(`/blog/${populated.slug}`)
    return NextResponse.json({ ok: true, post: populated })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 })
  }
}

