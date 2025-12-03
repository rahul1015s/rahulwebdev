import Link from "next/link"
import { projects } from "@/lib/data"
import connectMongoose from "@/lib/mongoose"
import Post from "@/models/post"
import { GlassBlogCard } from "@/components/cards/glass-blog-card"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Blog — Rahul Verma",
  description: "Short posts and notes by Rahul Verma",
}

const PAGE_SIZE = 9

type Props = { searchParams?: any }

export default async function BlogPage({ searchParams }: Props) {
  const sp = (await (searchParams as any)) ?? {}
  const page = Math.max(1, Number(sp?.page || '1'))
  const skip = (page - 1) * PAGE_SIZE

  await connectMongoose()

  const [posts, total] = await Promise.all([
    Post.find({}).sort({ createdAt: -1 }).skip(skip).limit(PAGE_SIZE).lean(),
    Post.countDocuments(),
  ])

  const totalPages = Math.max(1, Math.ceil((total || 0) / PAGE_SIZE))

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Blog</h1>
        <p className="text-base text-muted-foreground">Thoughts on design, development, and product architecture</p>
      </div>

      {posts.length > 0 && (
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-1">Latest Posts</h2>
            <p className="text-sm text-muted-foreground">Fresh insights and case studies</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p: any) => {
              const idOrSlug = p.slug || String(p._id)
              // Extract clean excerpt from Prosemirror content
              let excerpt = 'Read the full article for insights...'
              if (typeof p.content === 'string') {
                try {
                  const parsed = JSON.parse(p.content)
                  if (parsed?.content?.[0]?.content?.[0]?.text) {
                    excerpt = parsed.content[0].content[0].text
                  }
                } catch {
                  excerpt = p.content.slice(0, 120)
                }
              }
              
              return (
                <GlassBlogCard
                  key={idOrSlug}
                  href={`/blog/${idOrSlug}`}
                  title={p.title}
                  excerpt={excerpt}
                  image={p.image || undefined}
                  author={p.author || { name: 'Rahul Verma', avatar: 'https://github.com/shadcn.png' }}
                  date={p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : undefined}
                  readTime={p.readTime || '5 min read'}
                  tags={p.tags || ['Article']}
                />
              )
            })}
          </div>

          {/* Pagination controls */}
          <div className="mt-12 flex flex-col items-center justify-center gap-6">
            <div className="flex items-center gap-4">
              <Link
                href={`/blog?page=${Math.max(1, page - 1)}`}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  page <= 1
                    ? 'bg-muted/50 text-muted-foreground cursor-not-allowed'
                    : 'bg-primary/10 text-primary hover:bg-primary/20 active:scale-95'
                )}
              >
                ← Previous
              </Link>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (page <= 3) {
                    pageNum = i + 1
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = page - 2 + i
                  }
                  return pageNum
                }).map((p) => (
                  <Link
                    key={p}
                    href={`/blog?page=${p}`}
                    className={cn(
                      'w-9 h-9 flex items-center justify-center rounded-lg text-xs font-medium transition-all duration-200',
                      page === p
                        ? 'bg-primary text-primary-foreground font-semibold'
                        : 'text-muted-foreground hover:bg-muted/50'
                    )}
                  >
                    {p}
                  </Link>
                ))}
              </div>

              <Link
                href={`/blog?page=${Math.min(totalPages, page + 1)}`}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  page >= totalPages
                    ? 'bg-muted/50 text-muted-foreground cursor-not-allowed'
                    : 'bg-primary/10 text-primary hover:bg-primary/20 active:scale-95'
                )}
              >
                Next →
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">Page {page} of {totalPages}</p>
          </div>
        </section>
      )}

      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-1">Project Case Studies</h2>
          <p className="text-sm text-muted-foreground">Deep dives into real-world projects</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {projects.map((proj) => (
            <li key={proj.slug} className="group relative rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <Link href={`/blog/${proj.slug}`} className="space-y-2">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{proj.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{proj.description}</p>
                <div className="flex gap-2 pt-3 flex-wrap">
                  {proj.stack?.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary/80 font-medium">{tech}</span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
