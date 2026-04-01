import mongoose, { Schema, model, models } from 'mongoose'
import { LANDING_VARIANTS, type LandingVariant } from '@/lib/landing-variants'

export interface ISiteSettings {
  singletonKey: 'global'
  activeLandingVariant: LandingVariant
  updatedAt?: Date
  createdAt?: Date
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    singletonKey: {
      type: String,
      default: 'global',
      unique: true,
      immutable: true,
    },
    activeLandingVariant: {
      type: String,
      enum: LANDING_VARIANTS,
      default: 'classic',
    },
  },
  { timestamps: true }
)

const SiteSettings =
  (models.SiteSettings as mongoose.Model<ISiteSettings>) ||
  model<ISiteSettings>('SiteSettings', SiteSettingsSchema)

export default SiteSettings
