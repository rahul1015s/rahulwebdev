'use client'

import { useEffect } from 'react'
import { initClarity } from '@/lib/analytics'

/**
 * Analytics Provider Component
 * Initializes Microsoft Clarity for heatmap tracking
 * 
 * 🔥 Microsoft Clarity - Completely FREE
 * - Session recording with heatmaps
 * - Click heatmaps
 * - Scroll heatmaps
 * - Rage click detection
 * - Dead click detection
 * - Up to 100k sessions/month free
 * - No credit card required
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID
    if (clarityId) {
      initClarity(clarityId)
    } else {
      console.warn('⚠️ NEXT_PUBLIC_CLARITY_ID is not set. Heatmap tracking disabled.')
    }
  }, [])

  return children
}
