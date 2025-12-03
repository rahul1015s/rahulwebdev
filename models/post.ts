import mongoose, { Schema, models, model } from 'mongoose'

export interface IPost {
  title: string
  slug: string
  content: any
  published?: boolean
  createdAt?: Date
  updatedAt?: Date
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    content: { type: Schema.Types.Mixed, required: false },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const Post = (models.Post as mongoose.Model<IPost>) || model<IPost>('Post', PostSchema)

export default Post
