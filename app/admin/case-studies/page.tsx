import Link from 'next/link'
import connectMongoose from '@/lib/mongoose'
import CaseStudy from '@/models/casestudy'
import DeleteCaseStudyButton from './delete-button'

export const metadata = { title: 'Case Studies — Admin' }

export default async function CaseStudiesAdminPage() {
  await connectMongoose()
  const studies = await CaseStudy.find().sort({ createdAt: -1 }).lean()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Case Studies</h1>
        <Link href="/admin/case-studies/new" className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">New Case Study</Link>
      </div>

      <div className="grid gap-4">
        {studies.map((s: any) => (
          <div key={s._id} className="flex items-center justify-between gap-4 rounded-lg border border-border/50 p-4">
            <div className="flex items-center gap-4">
              {s.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.coverImage} alt={s.title} className="h-16 w-28 object-cover rounded-md" />
              ) : (
                <div className="h-16 w-28 rounded-md bg-muted/40" />
              )}
              <div>
                <div className="font-semibold">{s.title || s.name}</div>
                <div className="text-sm text-muted-foreground">{s.excerpt || s.tagline || ''}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href={`/admin/case-studies/${s.slug || s._id}/edit`} className="text-sm text-primary hover:underline">Edit</Link>
              <DeleteCaseStudyButton id={String(s._id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
