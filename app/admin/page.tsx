import Link from 'next/link'
import { FileText, BookOpen, Briefcase, Mail, Users, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LogoutButton } from '@/components/auth/LogoutButton'

export const metadata = { title: 'Admin — Rahul Verma' }

async function getStats() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/admin/stats`, { cache: 'no-store' })
    const data = await res.json()
    if (data?.ok) return data.stats
  } catch (e) {
    console.error('Failed to fetch stats:', e)
  }
  return {
    posts: { total: 0, published: 0, drafts: 0 },
    caseStudies: { total: 0, published: 0, drafts: 0 },
    subscribers: { total: 0, active: 0 },
    newsletters: { sent: 0, openRate: 0 }
  }
}

export default async function AdminPage() {
  const stats = await getStats()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 mt-14">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage content and site settings.</p>
        </div>
        <LogoutButton />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/blog" className="group rounded-lg border border-border/50 p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-200 bg-card/50 hover:bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="font-semibold text-lg">Blog Posts</h2>
          </div>
          <p className="text-sm text-muted-foreground">Create, edit and manage blog posts.</p>
        </Link>

        <Link href="/admin/case-studies" className="group rounded-lg border border-border/50 p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-200 bg-card/50 hover:bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Briefcase className="w-5 h-5" />
            </div>
            <h2 className="font-semibold text-lg">Case Studies</h2>
          </div>
          <p className="text-sm text-muted-foreground">Manage project case studies and portfolios.</p>
        </Link>

        <Link href="/admin/newsletter" className="group rounded-lg border border-border/50 p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-200 bg-card/50 hover:bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="font-semibold text-lg">Newsletter</h2>
          </div>
          <p className="text-sm text-muted-foreground">Send newsletters to subscribers.</p>
        </Link>
      </div>

      {/* Quick Stats Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Quick Overview</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border/50 p-4 bg-card/50">
            <div className="text-2xl font-bold text-primary">{stats.posts.published}</div>
            <div className="text-sm text-muted-foreground">Published Posts</div>
          </div>
          <div className="rounded-lg border border-border/50 p-4 bg-card/50">
            <div className="text-2xl font-bold text-primary">{stats.caseStudies.total}</div>
            <div className="text-sm text-muted-foreground">Case Studies</div>
          </div>
          <div className="rounded-lg border border-border/50 p-4 bg-card/50">
            <div className="text-2xl font-bold text-primary">{stats.subscribers.total}</div>
            <div className="text-sm text-muted-foreground">Total Subscribers</div>
            <div className="text-xs text-muted-foreground mt-1">{stats.subscribers.active} Active subscribers</div>
          </div>
          <div className="rounded-lg border border-border/50 p-4 bg-card/50">
            <div className="text-2xl font-bold text-primary">{stats.newsletters.sent}</div>
            <div className="text-sm text-muted-foreground">Newsletters Sent</div>
            <div className="text-xs text-muted-foreground mt-1">{stats.newsletters.sent} Total campaigns</div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
          <div className="rounded-lg border border-border/50 p-4 bg-card/50">
            <div className="text-2xl font-bold text-primary">{stats.posts.drafts}</div>
            <div className="text-sm text-muted-foreground">Draft Posts</div>
          </div>
          <div className="rounded-lg border border-border/50 p-4 bg-card/50">
            <div className="text-2xl font-bold text-primary">{stats.caseStudies.drafts}</div>
            <div className="text-sm text-muted-foreground">Draft Case Studies</div>
          </div>
          <div className="rounded-lg border border-border/50 p-4 bg-card/50">
            <div className="text-2xl font-bold text-primary">{stats.newsletters.openRate}%</div>
            <div className="text-sm text-muted-foreground">Open Rate</div>
            <div className="text-xs text-muted-foreground mt-1">{stats.newsletters.openRate}% Average open rate</div>
          </div>
          <div className="rounded-lg border border-border/50 p-4 bg-card/50">
            <div className="text-2xl font-bold text-primary">{stats.subscribers.total - stats.subscribers.active}</div>
            <div className="text-sm text-muted-foreground">Inactive Subscribers</div>
          </div>
        </div>
      </div>
    </div>
  )
}
