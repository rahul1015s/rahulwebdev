export const LANDING_VARIANTS = ['classic', 'nebula', 'grid'] as const
export type LandingVariant = (typeof LANDING_VARIANTS)[number]

export const DEFAULT_LANDING_VARIANT: LandingVariant = 'classic'
