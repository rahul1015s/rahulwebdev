import { connectDB } from '@/lib/mongodb'
import SiteSettings from '@/models/site-settings'
import {
  DEFAULT_LANDING_VARIANT,
  LANDING_VARIANTS,
  type LandingVariant,
} from '@/lib/landing-variants'

export { LANDING_VARIANTS, type LandingVariant } from '@/lib/landing-variants'

export function isLandingVariant(value: string): value is LandingVariant {
  return LANDING_VARIANTS.includes(value as LandingVariant)
}

export async function getActiveLandingVariant(): Promise<LandingVariant> {
  try {
    await connectDB()
    const settings = await SiteSettings.findOne({ singletonKey: 'global' }).lean()
    if (!settings?.activeLandingVariant) return DEFAULT_LANDING_VARIANT
    return isLandingVariant(settings.activeLandingVariant)
      ? settings.activeLandingVariant
      : DEFAULT_LANDING_VARIANT
  } catch (error) {
    console.error('Failed to read site settings:', error)
    return DEFAULT_LANDING_VARIANT
  }
}

export async function setActiveLandingVariant(variant: LandingVariant) {
  await connectDB()
  return SiteSettings.findOneAndUpdate(
    { singletonKey: 'global' },
    { $set: { activeLandingVariant: variant } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )
}
