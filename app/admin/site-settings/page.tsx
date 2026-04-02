import { Settings2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import LandingVariantForm from '@/components/admin/LandingVariantForm'
import { getActiveLandingVariant } from '@/lib/site-settings'

export const metadata = { title: 'Landing Settings — Admin' }

export default async function SiteSettingsPage() {
  const activeLandingVariant = await getActiveLandingVariant()

  return (
    <div className="mx-auto mt-14 max-w-4xl px-4 py-12">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Settings2 className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Landing Page Settings</h1>
          <p className="text-muted-foreground">Choose which landing page is live on the homepage.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Landing Variant</CardTitle>
          <CardDescription>
            Changes are applied to `/` immediately after saving.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LandingVariantForm initialVariant={activeLandingVariant} />
        </CardContent>
      </Card>
    </div>
  )
}
