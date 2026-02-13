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
      minlength: [3, 'Name must be at least 3 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
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

// Auto-generate slug from name
CategorySchema.pre('save', function (this: ICategory) {
  if (!this.isModified('name')) return
  
  this.slug = this.name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
})

const Category = (models.Category as mongoose.Model<ICategory>) || model<ICategory>('Category', CategorySchema)

export default Category
