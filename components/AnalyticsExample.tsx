'use client'

import { trackEvent } from '@/lib/analytics'

/**
 *   Microsoft Clarity Example Component
 * Shows how to track various user interactions with Clarity
 * 
 * These events will appear in your Clarity dashboard
 * Check: clarity.microsoft.com → Your Project → Analytics
 */

export function AnalyticsExample() {
  const handleCTAClick = () => {
    trackEvent('hire_me_cta_clicked', {
      section: 'hero',
      buttonText: 'Hire Me',
      timestamp: new Date().toISOString()
    })
    console.log('✅ Event tracked: hire_me_cta_clicked')
  }

  const handleProjectClick = (projectId: string, projectName: string) => {
    trackEvent('project_clicked', {
      projectId,
      projectName,
      timestamp: new Date().toISOString()
    })
  }

  const handleBlogClick = (postId: string, postTitle: string) => {
    trackEvent('blog_post_clicked', {
      postId,
      postTitle,
      timestamp: new Date().toISOString()
    })
  }

  const handleResumDownload = (format: string = 'pdf') => {
    trackEvent('resume_download_clicked', {
      format,
      timestamp: new Date().toISOString()
    })
  }

  const handleNewsletterSignup = () => {
    trackEvent('newsletter_signup_clicked', {
      timestamp: new Date().toISOString()
    })
  }

  const handleExternalLink = (url: string, label: string) => {
    trackEvent('external_link_clicked', {
      url,
      label,
      timestamp: new Date().toISOString()
    })
  }

  return (
    <div className="space-y-6 p-6 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="space-y-2">
        <h3 className="text-lg font-bold">  Clarity Analytics Examples</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Click buttons below to send events to Clarity. Check console (F12) for confirmation.
        </p>
      </div>

      <div className="grid gap-3">
        <button 
          onClick={handleCTAClick}
          className="px-4 py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition"
        >
          💼 Hire Me CTA
        </button>

        <button 
          onClick={() => handleProjectClick('proj-001', 'E-Commerce Platform')}
          className="px-4 py-3 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold transition"
        >
          🚀 View Project
        </button>

        <button 
          onClick={() => handleBlogClick('post-001', 'React Best Practices')}
          className="px-4 py-3 bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition"
        >
          📖 Read Blog Post
        </button>

        <button 
          onClick={() => handleExternalLink('https://github.com', 'GitHub Profile')}
          className="px-4 py-3 bg-linear-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white rounded-lg font-semibold transition"
        >
          🔗 Visit GitHub
        </button>

        <button 
          onClick={() => handleNewsletterSignup()}
          className="px-4 py-3 bg-linear-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-lg font-semibold transition"
        >
          📧 Newsletter Signup
        </button>

        <button 
          onClick={() => handleResumDownload('pdf')}
          className="px-4 py-3 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold transition"
        >
          📄 Download Resume
        </button>
      </div>

      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Tip:</strong> Open DevTools (F12) → Console to see tracking confirmations
        </p>
      </div>

      <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800">
        <p className="text-sm text-amber-800 dark:text-amber-200">
            Data will appear in your Clarity dashboard after 5-10 minutes
        </p>
      </div>
    </div>
  )
}
