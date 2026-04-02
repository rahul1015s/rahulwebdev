import mongoose, { Schema, models, model, Document } from 'mongoose'

export interface ICategory extends Document {
  name: string
  slug: string
  description?: string
  icon?: string
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
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
      maxlength: [200, 'Description must be < 200 chars'],
    },
    icon: {
      type: String,
      default: '📚',
    },
  },
  { timestamps: true }
)

function slugifyCategoryName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// Ensure slug exists before validation, so required checks never fail.
CategorySchema.pre('validate', function (this: ICategory) {
  if (this.slug && this.slug.trim()) return
  if (!this.name) return
  this.slug = slugifyCategoryName(this.name)
})

// Keep slug in sync when name changes.
CategorySchema.pre('save', function (this: ICategory) {
  if (!this.isModified('name')) return
  this.slug = slugifyCategoryName(this.name)
})

const Category = (models.Category as mongoose.Model<ICategory>) || model<ICategory>('Category', CategorySchema)

export default Category
