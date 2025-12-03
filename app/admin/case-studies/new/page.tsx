"use client"

import React, { useState } from 'react'
import NovelEditor from '@/components/admin/NovelEditor'

export default function NewCaseStudyPage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [extraImages, setExtraImages] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [resetKey, setResetKey] = useState(0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const images = extraImages
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)

      const res = await fetch('/api/admin/case-studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, excerpt, content, coverImage, images, tags: [], published })
      })

      const data = await res.json()
      if (data.ok) {
        setMessage('✓ Case study created')
        setTitle('')
        setSlug('')
        setExcerpt('')
        setCoverImage('')
        setExtraImages('')
        setContent('')
        setPublished(false)
        setResetKey((k) => k + 1)
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage(`✗ Error: ${data.error || 'unknown'}`)
      }
    } catch (err: any) {
      setMessage(String(err.message || err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Case Study</h1>
        <p className="text-muted-foreground">Add a detailed project writeup. You can paste Google Drive / OneDrive image URLs — they will be normalized.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Title *</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project title" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Slug (optional)</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated if empty" className="w-full rounded-lg border border-border/50 px-4 py-2.5 text-xs text-muted-foreground" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Excerpt</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Cover image URL</label>
          <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="Google Drive / OneDrive / Dropbox or CDN URL" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Additional image URLs (comma separated)</label>
          <input value={extraImages} onChange={(e) => setExtraImages(e.target.value)} placeholder="url1, url2, ..." className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Content *</label>
          <NovelEditor key={resetKey} value={content} onChange={setContent} />
        </div>

        <div className="flex items-center gap-3 p-4 rounded-lg border border-border/50 bg-muted/30">
          <input 
            type="checkbox" 
            id="published"
            checked={published} 
            onChange={(e)=>setPublished(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="published" className="text-sm font-semibold cursor-pointer flex-1">
            Publish immediately on /case-studies
          </label>
          <span className={`text-xs font-medium px-2 py-1 rounded ${published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            {published ? 'Published' : 'Draft'}
          </span>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button disabled={loading || !title || !content} type="submit" className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground">{loading ? 'Creating...' : 'Create Case Study'}</button>
          {message && <div className={`text-sm font-medium ${message.startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>}
        </div>
      </form>
    </div>
  )
}
