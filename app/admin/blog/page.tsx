import Link from 'next/link'

export const metadata = { title: 'Blog Management — Rahul Verma' }

export default async function BlogManagementPage() {
  // Server component: try to fetch posts from our API (server-side)
  let posts: any[] = []
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/admin/posts`, { cache: 'no-store' })
    const data = await res.json()
    if (data?.ok && Array.isArray(data.posts)) posts = data.posts
  } catch (e) {
    // ignore — fallback to empty
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <Link href="/admin/blog/new" className="rounded bg-primary px-3 py-2 text-sm text-white">New Post</Link>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Posts</h2>
        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No posts yet. Create one.</p>
        ) : (
          <ul className="space-y-3">
            {posts.map((p) => (
              <li key={p._id} className="border rounded p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-sm text-muted-foreground">{p.slug}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{new Date(p.createdAt).toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
