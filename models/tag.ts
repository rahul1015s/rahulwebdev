import mongoose, { Schema, models, model, Document } from 'mongoose'

export interface ITag extends Document {
  name: string
  slug: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

const TagSchema = new Schema<ITag>(
  {
    name: {
      type: String,
      required: [true, 'Tag name is required'],
      lowercase: true,
      trim: true,
      minlength: [2, 'Tag must be at least 2 characters'],
      maxlength: [30, 'Tag must be < 30 characters'],
    },
    slug: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      index: true, // CRITICAL for URL lookups
    },
    description: {
      type: String,
      maxlength: [100, 'Description must be < 100 chars'],
    },
  },
  { timestamps: true }
)

function slugifyTagName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

TagSchema.pre('validate', function (this: ITag) {
  if (this.slug && this.slug.trim()) return
  if (!this.name) return
  this.slug = slugifyTagName(this.name)
})

// Auto-generate slug from name
TagSchema.pre('save', function (this: ITag) {
  if (!this.isModified('name')) return
  this.slug = slugifyTagName(this.name)
})

// Prevent duplicates
TagSchema.index({ name: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } })

const Tag = (models.Tag as mongoose.Model<ITag>) || model<ITag>('Tag', TagSchema)

export default Tag
