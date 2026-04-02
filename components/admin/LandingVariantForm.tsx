'use client'

import { useState, useTransition } from 'react'
import { CheckCircle2, Circle } from 'lucide-react'
import { LANDING_VARIANTS, type LandingVariant } from '@/lib/landing-variants'
import { Button } from '@/components/ui/button'

const labels: Record<LandingVariant, string> = {
  classic: 'Classic Portfolio',
  nebula: 'Nebula',
  grid: 'Grid',
}

const descriptions: Record<LandingVariant, string> = {
  classic: 'Existing full portfolio layout with sections.',
  nebula: 'Animated hero scene with cosmic visuals and CTA.',
  grid: 'Wireframe style layout with a product-like pitch block.',
}

export default function LandingVariantForm({
  initialVariant,
}: {
  initialVariant: LandingVariant
}) {
  const [selected, setSelected] = useState<LandingVariant>(initialVariant)
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState('')

  const save = () => {
    startTransition(async () => {
      setStatus('Saving...')

      try {
        const res = await fetch('/api/admin/site-settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ activeLandingVariant: selected }),
        })

        const data = await res.json()

        if (!res.ok || !data?.ok) {
          setStatus(data?.error || 'Failed to update landing variant')
          return
        }

        setStatus(`Saved. Active landing: ${labels[selected]}`)
      } catch (error) {
        setStatus('Network error while saving settings')
      }
    })
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3">
        {LANDING_VARIANTS.map((variant) => {
          const active = selected === variant

          return (
            <button
              key={variant}
              type="button"
              onClick={() => setSelected(variant)}
              className={`rounded-xl border px-4 py-4 text-left transition ${
                active
                  ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                  : 'border-border/60 hover:border-primary/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{labels[variant]}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{descriptions[variant]}</p>
                </div>
                {active ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-3">
        <Button type="button" onClick={save} disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Active Landing'}
        </Button>
        <span className="text-sm text-muted-foreground">{status}</span>
      </div>
    </div>
  )
}
