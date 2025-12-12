"use client"
import React, { useState, useRef } from 'react'
import NovelEditor from '@/components/admin/NovelEditor'

export default function NewPostPage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [resetKey, setResetKey] = useState(0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, content, image, published: false })
      })
      const data = await res.json()
      if (data.ok) {
        setMessage('✓ Post created successfully')
        // Clear form and reset editor
        setTitle('')
        setSlug('')
        setContent('')
        setResetKey(prev => prev + 1)
        
        // Clear success message after 3 seconds
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage(`✗ Error: ${data.error || 'unknown'}`)
      }
    } catch (err: any) {
      setMessage(`✗ ${String(err.message || err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Create New Post</h1>
        <p className="text-muted-foreground">Write and publish your next blog post</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Title *</label>
          <input 
            required
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter post title..."
            className="w-full rounded-lg border border-border/50 px-4 py-2.5 bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all" 
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Slug (optional)</label>
          <input 
            value={slug} 
            onChange={(e) => setSlug(e.target.value)} 
            placeholder="leave-blank-for-auto-slug"
            className="w-full rounded-lg border border-border/50 px-4 py-2.5 bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all text-xs text-muted-foreground" 
          />
          <p className="text-xs text-muted-foreground mt-1">Leave blank and slug will be auto-generated from title</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Content *</label>
          <NovelEditor key={resetKey} value={content} onChange={setContent} />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Image URL (optional)</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://... or drive://fileId"
            className="w-full rounded-lg border border-border/50 px-4 py-2.5 text-sm"
          />
          <p className="text-xs text-muted-foreground mt-1">Optional cover image or featured image URL</p>
        </div>

        <div className="flex items-center gap-4 pt-6">
          <button 
            disabled={loading || !title || !content} 
            type="submit" 
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
          {message && (
            <div className={`text-sm font-medium ${message.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
