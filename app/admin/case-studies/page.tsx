import Link from 'next/link'
import Image from 'next/image'
import { Plus, Briefcase, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { connectDB } from '@/lib/mongodb'
import CaseStudy from '@/models/casestudy'
import DeleteCaseStudyButton from './delete-button'

export const metadata = { title: 'Case Studies — Admin' }

export default async function CaseStudiesAdminPage() {
  await connectDB()
  const studies = await CaseStudy.find().sort({ createdAt: -1 }).lean()

  const publishedStudies = studies.filter(s => s.published)
  const draftStudies = studies.filter(s => !s.published)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Case Studies</h1>
          <p className="text-muted-foreground">Manage your project case studies and portfolios.</p>
        </div>
        <Button asChild>
          <Link href="/admin/case-studies/new" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Case Study
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Studies</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studies.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{publishedStudies.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{draftStudies.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Case Studies Grid */}
      <div className="grid gap-6">
        {studies.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No case studies yet</h3>
              <p className="text-muted-foreground mb-6">Get started by creating your first case study.</p>
              <Button asChild>
                <Link href="/admin/case-studies/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Case Study
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          studies.map((s: any) => (
            <Card key={s._id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {s.coverImage ? (
                    <div className="shrink-0">
                      <div className="h-20 w-32 relative rounded-md overflow-hidden">
                        <Image
                          src={s.coverImage}
                          alt={s.title || s.name}
                          width={128}
                          height={80}
                          className="object-cover"
                          unoptimized={String(s.coverImage).startsWith('http')}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="shrink-0 h-20 w-32 rounded-md bg-muted/40 flex items-center justify-center">
                      <Briefcase className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg truncate">{s.title || s.name}</h3>
                      <Badge variant={s.published ? "default" : "secondary"}>
                        {s.published ? (
                          <>
                            <Eye className="w-3 h-3 mr-1" />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 mr-1" />
                            Draft
                          </>
                        )}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {s.excerpt || s.tagline || s.description || 'No description available'}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Slug: <code className="bg-muted px-1 py-0.5 rounded">{s.slug}</code>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/case-studies/${s.slug || s._id}/edit`}>
                        Edit
                      </Link>
                    </Button>
                       <DeleteCaseStudyButton id={String(s._id)} />
                   
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
