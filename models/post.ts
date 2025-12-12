import mongoose, { Schema, models, model } from 'mongoose'

export interface IPost {
  title: string
  slug: string
  content: any
  image?: string            // <-- ADDED
  tags?: string[]           // <-- OPTIONAL
  readTime?: string         // <-- OPTIONAL
  published?: boolean
  createdAt?: Date
  updatedAt?: Date
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    content: { type: Schema.Types.Mixed, required: false },

    // ---- New optional fields ----
    image: { type: String, required: false },
    tags: { type: [String], default: [] },
    readTime: { type: String },

    published: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const Post =
  (models.Post as mongoose.Model<IPost>) || model<IPost>('Post', PostSchema)

export default Post
