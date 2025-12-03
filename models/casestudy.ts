import mongoose, { Schema, Document } from 'mongoose'

export interface ICaseStudy extends Document {
  name: string
  slug: string
  tagline: string
  description: string
  content?: any
  coverImage?: string
  gallery?: string[]
  stack?: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  category?: string[]
  deliverables?: string[]
  timeline?: string
  client?: string
  team?: string[]
  challenges?: string[]
  solutions?: string[]
  results?: string[]
  published?: boolean
  order?: number
  createdAt?: Date
  updatedAt?: Date
}

const CaseStudySchema = new Schema<ICaseStudy>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    tagline: { type: String, required: false },
    description: { type: String, required: false },
    content: { type: Schema.Types.Mixed, default: null },
    coverImage: { type: String },
    gallery: [{ type: String }],
    stack: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false },
    category: [{ type: String }],
    deliverables: [{ type: String }],
    timeline: { type: String },
    client: { type: String },
    team: [{ type: String }],
    challenges: [{ type: String }],
    solutions: [{ type: String }],
    results: [{ type: String }],
    published: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
)

const CaseStudy = mongoose.models.CaseStudy || mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema)
export default CaseStudy