import Link from 'next/link'

export const metadata = { title: 'Admin — Rahul Verma' }

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-6">Manage content and site settings.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/admin/case-studies" className="rounded-lg border border-border/50 p-6 hover:shadow-md transition">
          <h2 className="font-semibold text-lg">Case Studies</h2>
          <p className="text-sm text-muted-foreground mt-1">Create, edit and manage project case studies.</p>
        </Link>

        <Link href="/admin/blog" className="rounded-lg border border-border/50 p-6 hover:shadow-md transition">
          <h2 className="font-semibold text-lg">Blog</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage blog posts (create/edit/delete).</p>
        </Link>
      </div>
    </div>
  )
}
