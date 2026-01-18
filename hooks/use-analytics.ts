'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackEvent, setPageMetadata } from '@/lib/analytics'

/**
 * Hook for tracking page views with Clarity
 * Automatically logs when user navigates to a new page
 */
export function usePageTracking(pageName?: string) {
  const pathname = usePathname()

  useEffect(() => {
    const title = pageName || document.title || pathname
    setPageMetadata('pageTitle', title)
    setPageMetadata('pagePath', pathname)

    if (process.env.NODE_ENV === 'development') {
      console.log(`📄 Tracking: ${title}`)
    }
  }, [pathname, pageName])

  return {
    trackEvent: (eventName: string, data?: Record<string, any>) => {
      trackEvent(eventName, { page: pathname, ...data })
    }
  }
}

/**
 * Hook for tracking specific element interactions
 * Usage: const tracker = useElementTracking()
 * Then: onClick={() => tracker.track('button_name')}
 */
export function useElementTracking() {
  return {
    track: (elementName: string, metadata?: Record<string, any>) => {
      trackEvent('element_interaction', {
        element: elementName,
        timestamp: new Date().toISOString(),
        ...metadata
      })
    }
  }
}
