import Link from 'next/link'
import { FileText, BookOpen, Briefcase, Mail, Users, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LogoutButton } from '@/components/auth/LogoutButton'
import api from '@/lib/api'

export const metadata = { title: 'Admin — Rahul Verma' }

async function getStats() {
  try {
    const res = await api.get('/api/admin/stats')
    const data = res.data
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
    <div className="mx-auto mt-14 max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage content and site settings.</p>
        </div>
        <LogoutButton />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/blog" className="group rounded-lg border border-border/50 bg-card/50 p-4 transition-all duration-200 hover:border-primary/20 hover:bg-card hover:shadow-md">
          <div className="mb-2.5 flex items-center gap-2.5">
            <div className="rounded-md bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <FileText className="h-4 w-4" />
            </div>
            <h2 className="text-base font-semibold">Blog Posts</h2>
          </div>
          <p className="text-sm text-muted-foreground">Create, edit and manage blog posts.</p>
        </Link>

        <Link href="/admin/case-studies" className="group rounded-lg border border-border/50 bg-card/50 p-4 transition-all duration-200 hover:border-primary/20 hover:bg-card hover:shadow-md">
          <div className="mb-2.5 flex items-center gap-2.5">
            <div className="rounded-md bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Briefcase className="h-4 w-4" />
            </div>
            <h2 className="text-base font-semibold">Case Studies</h2>
          </div>
          <p className="text-sm text-muted-foreground">Manage project case studies and portfolios.</p>
        </Link>

        <Link href="/admin/newsletter" className="group rounded-lg border border-border/50 bg-card/50 p-4 transition-all duration-200 hover:border-primary/20 hover:bg-card hover:shadow-md">
          <div className="mb-2.5 flex items-center gap-2.5">
            <div className="rounded-md bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Mail className="h-4 w-4" />
            </div>
            <h2 className="text-base font-semibold">Newsletter</h2>
          </div>
          <p className="text-sm text-muted-foreground">Send newsletters to subscribers.</p>
        </Link>
      </div>

      {/* Quick Stats Section */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">Quick Overview</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border/50 bg-card/50 p-4">
            <div className="text-xl font-semibold text-primary">{stats.posts.published}</div>
            <div className="text-sm text-muted-foreground">Published Posts</div>
          </div>
          <div className="rounded-lg border border-border/50 bg-card/50 p-4">
            <div className="text-xl font-semibold text-primary">{stats.caseStudies.total}</div>
            <div className="text-sm text-muted-foreground">Case Studies</div>
          </div>
          <div className="rounded-lg border border-border/50 bg-card/50 p-4">
            <div className="text-xl font-semibold text-primary">{stats.subscribers.total}</div>
            <div className="text-sm text-muted-foreground">Total Subscribers</div>
            <div className="text-xs text-muted-foreground mt-1">{stats.subscribers.active} Active subscribers</div>
          </div>
          <div className="rounded-lg border border-border/50 bg-card/50 p-4">
            <div className="text-xl font-semibold text-primary">{stats.newsletters.sent}</div>
            <div className="text-sm text-muted-foreground">Newsletters Sent</div>
            <div className="text-xs text-muted-foreground mt-1">{stats.newsletters.sent} Total campaigns</div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
          <div className="rounded-lg border border-border/50 bg-card/50 p-4">
            <div className="text-xl font-semibold text-primary">{stats.posts.drafts}</div>
            <div className="text-sm text-muted-foreground">Draft Posts</div>
          </div>
          <div className="rounded-lg border border-border/50 bg-card/50 p-4">
            <div className="text-xl font-semibold text-primary">{stats.caseStudies.drafts}</div>
            <div className="text-sm text-muted-foreground">Draft Case Studies</div>
          </div>
          <div className="rounded-lg border border-border/50 bg-card/50 p-4">
            <div className="text-xl font-semibold text-primary">{stats.newsletters.openRate}%</div>
            <div className="text-sm text-muted-foreground">Open Rate</div>
            <div className="text-xs text-muted-foreground mt-1">{stats.newsletters.openRate}% Average open rate</div>
          </div>
          <div className="rounded-lg border border-border/50 bg-card/50 p-4">
            <div className="text-xl font-semibold text-primary">{stats.subscribers.total - stats.subscribers.active}</div>
            <div className="text-sm text-muted-foreground">Inactive Subscribers</div>
          </div>
        </div>
      </div>
    </div>
  )
}
