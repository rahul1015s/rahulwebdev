import Link from "next/link"
import Image from "next/image"
import { GlassBlogCard } from "@/components/cards/glass-blog-card"
import connectMongoose from "@/lib/mongoose"
import CaseStudy from "@/models/casestudy"

export const metadata = {
  title: "Case Studies — Rahul Verma",
  description: "In-depth case studies of selected projects",
}

export const revalidate = 60 // ISR: Revalidate every 60 seconds

async function getCaseStudies() {
  try {
    await connectMongoose()
    const studies = await CaseStudy.find({ published: true })
      .sort({ order: 1, createdAt: -1 })
      .lean()
    return studies
  } catch (error) {
    console.error('Error fetching case studies:', error)
    return []
  }
}

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold">Case Studies</h1>
        <p className="text-lg text-muted-foreground">Detailed walkthroughs and lessons learned from shipped projects.</p>
      </div>

      {studies.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">No case studies published yet.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {studies.map((study: any) => (
            <GlassBlogCard
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              title={study.name}
              excerpt={study.description || study.tagline}
              image={study.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'}
              tags={study.stack?.slice(0, 2) || []}
              date={new Date(study.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
              readTime={`${Math.ceil((study.content?.length || 0) / 1000)} min read`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
