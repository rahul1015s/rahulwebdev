import mongoose, { Schema, models, model } from 'mongoose'
import '@/models/category'
import '@/models/tag'

export interface IPost {
  title: string
  slug: string
  content: unknown
  image?: string
  category?: mongoose.Types.ObjectId // NEW: Single category reference
  tags?: mongoose.Types.ObjectId[]     // UPDATED: Now ObjectId array instead of strings
  tagNames?: string[]                  // Keep for backward compatibility
  readTime?: string
  metaTitle?: string
  metaDescription?: string
  published?: boolean
  createdAt?: Date
  updatedAt?: Date
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    content: { type: Schema.Types.Mixed, required: false },

    image: { type: String, required: false },
    
    // NEW: Category reference (one-to-many)
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
      index: true, // For filtering by category
    },
    
    // UPDATED: Tags now use ObjectId references (many-to-many)
    tags: {
      type: [Schema.Types.ObjectId],
      ref: 'Tag',
      default: [],
      index: true, // For filtering by tag
    },
    
    // Keep old format for backward compatibility
    tagNames: { type: [String], default: [] },
    
    readTime: { type: String },
    
    // NEW: SEO fields
    metaTitle: {
      type: String,
      maxlength: [60, 'Meta title should be < 60 chars for SEO'],
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'Meta description should be < 160 chars for SEO'],
    },

    published: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
)

// Compound indexes for common queries
PostSchema.index({ published: 1, createdAt: -1 }) // Get published posts sorted by date
PostSchema.index({ category: 1, published: 1 }) // Get published posts by category
PostSchema.index({ tags: 1, published: 1 }) // Get published posts by tag

// Auto-populate category and tags on find
PostSchema.pre(/^find/, function (this: mongoose.Query<unknown, IPost>) {
  const queryOptions = this.getOptions() as { _recursed?: boolean }
  if (queryOptions._recursed) {
    return
  }
  // Only populate if fields are referenced
  this.populate({ path: 'category', select: 'name slug icon' })
    .populate({ path: 'tags', select: 'name slug' })
})

const Post =
  (models.Post as mongoose.Model<IPost>) || model<IPost>('Post', PostSchema)

export default Post
