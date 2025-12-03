import mongoose from 'mongoose'
import CaseStudy from '@/models/casestudy'

async function publishCaseStudies() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI
    if (!mongoUri) {
      console.error('MONGODB_URI not set in environment variables')
      process.exit(1)
    }

    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')

    // Update all case studies to published
    const result = await CaseStudy.updateMany(
      { published: { $ne: true } },
      { $set: { published: true } }
    )

    console.log(`✅ Updated ${result.modifiedCount} case studies to published`)

    // Show all published studies
    const published = await CaseStudy.find({ published: true }).lean()
    console.log(`\n📚 Published case studies (${published.length}):`)
    published.forEach((s: any) => {
      console.log(`  - ${s.name} (slug: ${s.slug})`)
    })

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

publishCaseStudies()
