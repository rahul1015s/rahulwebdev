"use client"

import React, { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import NovelEditor from '@/components/admin/NovelEditor'

type Props = { params: Promise<{ id: string }> }

export default function EditCaseStudyPage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [extraImages, setExtraImages] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const res = await fetch(`/api/admin/case-studies/${id}`)
        const data = await res.json()
        if (!mounted) return
        if (data.ok && data.caseStudy) {
          const s = data.caseStudy
          setTitle(s.title || s.name || '')
          setSlug(s.slug || '')
          setExcerpt(s.excerpt || s.tagline || '')
          setCoverImage(s.coverImage || '')
          setExtraImages((s.images || s.gallery || []).join(', '))
          // Handle content - could be string or object
          if (typeof s.content === 'string') {
            setContent(s.content)
          } else if (s.content) {
            setContent(JSON.stringify(s.content))
          } else {
            setContent('')
          }
          setPublished(s.published || false)
        } else {
          setMessage('Failed to load')
        }
      } catch (err: any) {
        setMessage(String(err.message || err))
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [id])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      const images = extraImages.split(',').map(s=>s.trim()).filter(Boolean)
      const res = await fetch(`/api/admin/case-studies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, excerpt, content, coverImage, images, published })
      })
      const data = await res.json()
      if (data.ok) {
        setMessage('✓ Saved')
        setTimeout(()=>router.push('/admin/case-studies'), 800)
      } else {
        setMessage(`✗ ${data.error || 'Save failed'}`)
      }
    } catch (err: any) {
      setMessage(String(err.message || err))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-6">Loading…</div>

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Edit Case Study</h1>
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Slug</label>
          <input value={slug} onChange={(e)=>setSlug(e.target.value)} className="w-full rounded-lg border px-4 py-2.5 text-xs text-muted-foreground" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Excerpt</label>
          <textarea value={excerpt} onChange={(e)=>setExcerpt(e.target.value)} rows={2} className="w-full rounded-lg border px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Cover image URL</label>
          <input value={coverImage} onChange={(e)=>setCoverImage(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Additional images (comma separated)</label>
          <input value={extraImages} onChange={(e)=>setExtraImages(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Content</label>
          <NovelEditor value={content} onChange={setContent} />
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
            Publish on /case-studies
          </label>
          <span className={`text-xs font-medium px-2 py-1 rounded ${published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            {published ? 'Published' : 'Draft'}
          </span>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button disabled={saving} type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">{saving ? 'Saving…' : 'Save changes'}</button>
          {message && <div className={`text-sm font-medium ${message.startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>}
        </div>
      </form>
    </div>
  )
}
