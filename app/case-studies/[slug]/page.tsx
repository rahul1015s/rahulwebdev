import Image from "next/image"
import { notFound } from "next/navigation"
import connectMongoose from "@/lib/mongoose"
import CaseStudy from "@/models/casestudy"
import PostContent from "@/components/blog/PostContent"

export const revalidate = 60 // ISR: Revalidate every 60 seconds

async function getCaseStudy(slug: string) {
  try {
    await connectMongoose()
    const study = await CaseStudy.findOne({ slug }).lean()
    
    // Ensure content is properly stored/retrieved
    if (study && study.content && typeof study.content === 'object') {
      // If it's already an object (MongoDB might have parsed it), convert to string for PostContent
      study.content = JSON.stringify(study.content)
    }
    
    return study
  } catch (error) {
    console.error('Error fetching case study:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: any }) {
  const { slug } = await params
  const study = await getCaseStudy(slug)
  if (!study) return { title: "Not Found" }

  return {
    title: `${study.name} — Case Study`,
    description: study.description || study.tagline || "Case study details",
  }
}

export default async function CaseStudyPage({ params }: { params: any }) {
  const { slug } = await params
  const study = await getCaseStudy(slug)
  
  if (!study) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      {/* Hero Section */}
      {study.coverImage && (
        <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={study.coverImage}
            alt={study.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{study.name}</h1>
        <p className="text-lg text-muted-foreground mb-4">{study.tagline || study.description}</p>
        
        {/* Meta Info */}
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground border-t pt-4">
          {study.client && (
            <div>
              <span className="font-semibold text-foreground">Client:</span> {study.client}
            </div>
          )}
          {study.timeline && (
            <div>
              <span className="font-semibold text-foreground">Timeline:</span> {study.timeline}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      {study.content && (
        <article className="prose prose-sm md:prose-base prose-a:text-primary prose-a:underline-offset-4 max-w-none mb-12">
          <PostContent content={study.content} />
        </article>
      )}

      {/* Tech Stack */}
      {study.stack && study.stack.length > 0 && (
        <section className="border-t py-8">
          <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {study.stack.map((tech: string) => (
              <span key={tech} className="inline-block bg-muted px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {study.gallery && study.gallery.length > 0 && (
        <section className="border-t py-8">
          <h2 className="text-xl font-semibold mb-4">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {study.gallery.map((image: string, idx: number) => (
              <div key={idx} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`${study.name} - ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Challenges & Solutions */}
      {(study.challenges?.length > 0 || study.solutions?.length > 0) && (
        <section className="border-t py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {study.challenges?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Challenges</h3>
                <ul className="space-y-2">
                  {study.challenges.map((challenge: string, idx: number) => (
                    <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-red-500 font-bold">•</span> {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {study.solutions?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Solutions</h3>
                <ul className="space-y-2">
                  {study.solutions.map((solution: string, idx: number) => (
                    <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-green-500 font-bold">✓</span> {solution}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Results */}
      {study.results?.length > 0 && (
        <section className="border-t py-8">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <ul className="space-y-2">
            {study.results.map((result: string, idx: number) => (
              <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-blue-500 font-bold">★</span> {result}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Links */}
      {(study.liveUrl || study.githubUrl) && (
        <section className="border-t py-8 flex gap-4">
          {study.liveUrl && (
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              View Live →
            </a>
          )}
          {study.githubUrl && (
            <a
              href={study.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 border border-primary rounded-lg hover:bg-muted transition-colors"
            >
              GitHub →
            </a>
          )}
        </section>
      )}
    </article>
  )
}
