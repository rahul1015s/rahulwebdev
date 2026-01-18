/**
 * Microsoft Clarity Integration 🔥
 * Free & powerful heatmap analytics - no credit card needed
 * 
 * Features:
 * - Session recordings with heatmaps
 * - Click & scroll heatmaps
 * - Rage click detection
 * - Dead click detection
 * - Form field analytics
 * - Up to 100k sessions/month free
 */

export const initClarity = (clarityId: string) => {
  if (typeof window !== 'undefined' && !window.clarity) {
    (function (c: any, l: Document, a: string, r: string, i: string, t?: any, y?: Element) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }
      t = l.createElement(r)
      if (t) {
        t.async = true
        t.src = "https://www.clarity.ms/tag/" + i
        y = l.getElementsByTagName(r)[0]
        if (y && y.parentNode) {
          y.parentNode.insertBefore(t, y)
        }
      }
    })(window, document, "clarity", "script", clarityId)
    console.log('✅ Microsoft Clarity initialized')
  }
}

/**
 * Track custom events in Clarity
 * These will appear in your Clarity dashboard under custom events
 */
export const trackEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('event', eventName, data)
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Event: ${eventName}`, data)
    }
  }
}

/**
 * Identify a user in Clarity for better session analysis
 * Call this after user login
 */
export const identifyUser = (userId: string, userProperties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('identify', userId)
    if (process.env.NODE_ENV === 'development') {
      console.log(`👤 User identified: ${userId}`, userProperties)
    }
  }
}

/**
 * Set custom page metadata for better session tracking
 */
export const setPageMetadata = (key: string, value: string) => {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('set', key, value)
  }
}

// Global window type augmentation
declare global {
  interface Window {
    clarity?: any
  }
}
