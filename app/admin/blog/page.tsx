import Link from 'next/link'
import { Plus, FileText, Calendar, Eye, Grid3X3, List, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PostRow from '@/components/admin/PostRow'
import PostTable from '@/components/admin/PostTable'

export const metadata = { title: 'Blog Management — Rahul Verma' }

export default async function BlogManagementPage({
  searchParams
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // Server component: try to fetch posts from our API (server-side)
  let posts: any[] = []
  let error: string | null = null

  const params = searchParams ? await searchParams : {}
  const search = typeof params.search === 'string' ? params.search : ''
  const status = typeof params.status === 'string' ? params.status : 'all'

  try {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (status && status !== 'all') params.set('status', status)
    const queryString = params.toString()
    const url = `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/admin/posts${queryString ? `?${queryString}` : ''}`

    const res = await fetch(url, { cache: 'no-store' })
    const data = await res.json()
    if (data?.ok && Array.isArray(data.posts)) posts = data.posts
    else error = data?.error || 'Failed to load posts'
  } catch (e) {
    error = 'Network error loading posts'
  }

  const publishedPosts = posts.filter(p => p.published)
  const draftPosts = posts.filter(p => !p.published)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 mt-14">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog Management</h1>
          <p className="text-muted-foreground">Manage your blog posts and content.</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{publishedPosts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{draftPosts.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <form method="GET" className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search posts by title, slug, or content..."
                  className="pl-10"
                  name="search"
                  defaultValue={search}
                />
              </div>
            </div>
            <Select name="status" defaultValue={status}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            {(search || status !== 'all') && (
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/blog">Clear</Link>
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Posts List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Posts</CardTitle>
              <CardDescription>
                {posts.length === 0 ? 'No posts found.' : `${posts.length} posts found.`}
                {search && ` Matching "${search}"`}
                {status !== 'all' && ` (${status})`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {search || status !== 'all' ? 'No posts match your search' : 'No posts yet'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {search || status !== 'all'
                  ? 'Try adjusting your search or filters.'
                  : 'Get started by creating your first blog post.'
                }
              </p>
              {(!search && status === 'all') && (
                <Button asChild>
                  <Link href="/admin/blog/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Post
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <Tabs defaultValue="cards" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cards" className="flex items-center gap-2">
                  <Grid3X3 className="w-4 h-4" />
                  Card View
                </TabsTrigger>
                <TabsTrigger value="table" className="flex items-center gap-2">
                  <List className="w-4 h-4" />
                  Table View
                </TabsTrigger>
              </TabsList>
              <TabsContent value="cards" className="mt-6">
                <div className="space-y-4">
                  {posts.map((p) => (
                    <PostRow key={p._id} post={p} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="table" className="mt-6">
                <PostTable posts={posts} />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
