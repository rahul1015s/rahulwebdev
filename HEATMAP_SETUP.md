# 🔥 Microsoft Clarity Heatmap Setup

This document explains how to set up **Microsoft Clarity** - a completely free heatmap and analytics tool (no credit card required).

## Why Microsoft Clarity?

✅ **Completely FREE**
✅ **No credit card required**
✅ **Up to 100,000 sessions/month**
✅ **Session recordings with heatmaps**
✅ **Click & scroll heatmaps**
✅ **Rage click detection**
✅ **Dead click detection**
✅ **Form field analytics**
✅ **GDPR & CCPA compliant**

---

## Setup Instructions (2 Minutes)

### Step 1: Sign Up
1. Go to [clarity.microsoft.com](https://clarity.microsoft.com)
2. Click **"Get started for free"**
3. Sign in with a Microsoft account (create one if needed - it's free)

### Step 2: Create Project
1. Click **"Create project"**
2. Enter your website URL: `https://rahulwebdev.in`
3. Copy your **Clarity ID** (looks like: `abc1234def5678`)

### Step 3: Add to Environment Variables
1. Open `.env.local` in your project root
2. Add:
   ```
   NEXT_PUBLIC_CLARITY_ID=your_clarity_id_here
   ```

### Step 4: Restart Dev Server
```bash
npm run dev
```

### Step 5: Verify
1. Visit your website
2. Open browser DevTools (F12)
3. Check console - you should see: ✅ Microsoft Clarity initialized
4. Go to clarity.microsoft.com dashboard
5. Wait 5-10 minutes for data to appear

---

## Your Code is Ready! 

✅ Clarity is already integrated into your app via:
- [lib/analytics.ts](lib/analytics.ts) - Core analytics functions
- [providers/AnalyticsProvider.tsx](providers/AnalyticsProvider.tsx) - Initialization
- [hooks/use-analytics.ts](hooks/use-analytics.ts) - React hooks for tracking

---

## Using Clarity in Your Components

### 1. Track Custom Events

```typescript
'use client'

import { trackEvent } from '@/lib/analytics'

export function HireButton() {
  const handleClick = () => {
    trackEvent('hire_me_clicked', {
      section: 'hero',
      source: 'cta_button'
    })
  }

  return <button onClick={handleClick}>Hire Me</button>
}
```

### 2. Use Page Tracking Hook

```typescript
'use client'

import { usePageTracking } from '@/hooks/use-analytics'

export function BlogPage() {
  const { trackEvent } = usePageTracking('Blog Page')

  return (
    <button onClick={() => trackEvent('article_shared')}>
      Share
    </button>
  )
}
```

### 3. Identify Users (After Login)

```typescript
import { identifyUser } from '@/lib/analytics'

// In your login handler:
identifyUser(userId, {
  email: user.email,
  name: user.name
})
```

### 4. Track Element Interactions

```typescript
'use client'

import { useElementTracking } from '@/hooks/use-analytics'

export function ProjectCard() {
  const tracker = useElementTracking()

  return (
    <div onClick={() => tracker.track('project_card_clicked')}>
      {/* content */}
    </div>
  )
}
```

---

## Recommended Events to Track

Add these throughout your website:

```typescript
// Hero Section
trackEvent('cta_clicked', { buttonText, section: 'hero' })

// Projects Section
trackEvent('project_viewed', { projectId, projectName })
trackEvent('project_github_clicked', { projectId })

// Blog Section
trackEvent('blog_post_opened', { postId, postTitle })
trackEvent('blog_post_shared', { postId, platform })

// Contact & Newsletter
trackEvent('newsletter_signup', { email })
trackEvent('contact_form_submitted', { message: 'success' })

// Resume
trackEvent('resume_downloaded', { format: 'pdf' })

// External Links
trackEvent('external_link_clicked', { url, label })
```

---

## Clarity Dashboard - What to Look For

Once data starts appearing, you'll see:

### 📊 Heatmaps
- **Click Heatmap**: Where do users click most?
- **Scroll Heatmap**: How far down do users scroll?
- **Attention Map**: Which areas get attention?

### 🔴 Rage Clicks
- Users clicking rapidly on same element
- Indicates frustration or UI confusion
- Fix these immediately!

### ⚪ Dead Clicks
- Users clicking non-interactive elements
- Shows where users expect clickable elements
- Great UX improvement opportunity

### 📹 Session Recordings
- Watch real users navigate your site
- Find confusing flows
- See exact user behavior

### 📝 Form Analytics
- Which fields cause drop-offs?
- How long on each field?
- Where do users get stuck?

### 👥 User Insights
- Device type, browser, location
- Traffic sources
- User segments

---

## Custom Events Examples

Here's a complete example component:

```typescript
'use client'

import { trackEvent } from '@/lib/analytics'

export function ExampleTracking() {
  return (
    <div className="space-y-4">
      <button
        onClick={() => trackEvent('hire_button_clicked')}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Hire Me
      </button>

      <button
        onClick={() => trackEvent('resume_download_clicked', { format: 'pdf' })}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Download Resume
      </button>

      <button
        onClick={() => trackEvent('github_profile_clicked')}
        className="px-4 py-2 bg-gray-600 text-white rounded"
      >
        View GitHub
      </button>

      <button
        onClick={() => trackEvent('contact_form_opened')}
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        Contact Me
      </button>
    </div>
  )
}
```

---

## Privacy & Compliance

✅ **GDPR Compliant** - Clarity respects GDPR requirements
✅ **CCPA Compliant** - Users can opt-out
✅ **HIPAA Compliant** - If needed for health data

### Add to Your Privacy Policy:

*"We use Microsoft Clarity to understand how users interact with our website. This helps us improve user experience. Session recordings are anonymized and do not contain sensitive information."*

---

## Troubleshooting

### "✅ Microsoft Clarity initialized" not showing?
- Check that `NEXT_PUBLIC_CLARITY_ID` is in `.env.local`
- Restart dev server: `npm run dev`
- Check browser console for errors (F12)

### No data in Clarity dashboard?
- Wait 5-10 minutes for initial data to appear
- Make sure your environment variable is correct
- Visit your website and interact with it
- Check that Clarity is initialized in console

### Recording disabled?
- Clarity may auto-disable on pages with sensitive data (login forms, etc.)
- This is automatic for privacy protection
- Enable manually in Clarity dashboard if needed

---

## Next Steps

1. ✅ Set up Clarity account
2. ✅ Add `NEXT_PUBLIC_CLARITY_ID` to `.env.local`
3. ✅ Restart dev server
4. Add tracking to key user interactions
5. Check Clarity dashboard tomorrow
6. Analyze heatmaps and session recordings
7. Improve UX based on findings

---

## Resources

- [Microsoft Clarity Docs](https://learn.microsoft.com/en-us/clarity/)
- [Clarity Dashboard](https://clarity.microsoft.com)
- [Analytics Code](lib/analytics.ts)
- [Analytics Hook](hooks/use-analytics.ts)
- [Analytics Provider](providers/AnalyticsProvider.tsx)


