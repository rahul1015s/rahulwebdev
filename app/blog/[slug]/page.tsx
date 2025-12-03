import { notFound } from 'next/navigation'
import connectMongoose from '@/lib/mongoose'
import Post from '@/models/post'
import PostContent from '@/components/blog/PostContent'
import { BlogTypography } from '@/components/blog/blog-typography'
import Link from 'next/link'
import { projects } from '@/lib/data'

export async function generateStaticParams() {
  // provide some static slugs for the sample posts
  return [
    { slug: 'welcome' },
    { slug: 'design-to-code' },
    ...projects.map((p) => ({ slug: p.slug })),
  ]
}

export default async function PostPage({ params }: { params: any }) {
  const { slug } = await params
  await connectMongoose()

  // Try to find by slug first
  let post = await Post.findOne({ slug }).lean()

  // If not found and slug looks like an ObjectId, try by _id
  if (!post && /^[0-9a-fA-F]{24}$/.test(slug)) {
    post = await Post.findById(slug).lean()
  }

  if (!post) {
    // Fallback to demo/sample posts or project writeups
    // Render the demo BlogTypography for the sample slugs so clicking cards shows full content
    if (slug === 'welcome' || slug === 'design-to-code') {
      return <BlogTypography />
    }

    const project = projects.find((p) => p.slug === slug)
    if (project) {
      return (
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
          <p className="mb-4">{project.description}</p>
          <p className="text-sm text-muted-foreground">Stack: {project.stack.join(', ')}</p>
        </div>
      )
    }

    return notFound()
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-primary/80 hover:text-primary transition-colors mb-8">
        ← Back to blog
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 pt-4 border-t border-border/50">
          <time className="text-sm text-muted-foreground">
            {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
          </time>
        </div>
      </header>

      <article className="prose prose-sm md:prose-base prose-a:text-primary prose-a:underline-offset-4 max-w-none mb-12">
        <PostContent content={post.content} />
      </article>

      <footer className="mt-16 pt-8 border-t border-border/50">
        <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium">
          ← Back to blog
        </Link>
      </footer>
    </div>
  )
}
