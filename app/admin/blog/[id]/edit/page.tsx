"use client"
import React, { useEffect, useState, use as reactUse } from 'react'
import { useRouter } from 'next/navigation'
import NovelEditor from '@/components/admin/NovelEditor'
import { Checkbox } from '@/components/ui/checkbox'

export default function EditPostPage({ params }: any) {
  const resolvedParams = reactUse(params as Promise<any>)
  const id = resolvedParams?.id
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [published, setPublished] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch(`/api/admin/posts/${id}`)
        const data = await res.json()
        if (data?.ok && data.post && mounted) {
          setTitle(data.post.title || '')
          setSlug(data.post.slug || '')
          setContent(data.post.content || '')
          setImage(data.post.image || '')
          setPublished(data.post.published || false)
        } else {
          setMessage('Failed to load post')
        }
      } catch (err: any) {
        setMessage(String(err.message || err))
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [id])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, slug, content, image, published })
      })
      let data: any = null
      try { data = await res.json() } catch (e) { console.error('Save: failed to parse JSON', e) }

      if (res.ok && data?.ok !== false) {
        setMessage('✓ Saved')
        // Optionally navigate back to admin list after save
        setTimeout(() => {
          setMessage(null)
          router.push('/admin/blog')
        }, 800)
      } else {
        console.error('Save failed', { status: res.status, data })
        setMessage(`✗ ${data?.error || `HTTP ${res.status}`}`)
      }
    } catch (err: any) {
      setMessage(String(err.message || err))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8">Loading…</div>

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Edit Post</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Title *</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Slug</label>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded-lg border px-4 py-2.5 text-sm text-muted-foreground" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Image URL (optional)</label>
          <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://... or drive://fileId" className="w-full rounded-lg border px-4 py-2.5 text-sm" />
          <p className="text-xs text-muted-foreground mt-1">Optional cover/featured image URL</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Content *</label>
          <NovelEditor value={content} onChange={setContent} />
        </div>

        <div className="flex items-center gap-3 p-4 rounded-lg border border-border/50 bg-muted/30">
          <Checkbox
            id="published"
            checked={published}
            onCheckedChange={(checked) => setPublished(checked as boolean)}
          />
          <label htmlFor="published" className="text-sm font-semibold cursor-pointer flex-1">
            Publish this post
          </label>
          <span className={`text-xs font-medium px-2 py-1 rounded ${published ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
            {published ? 'Published' : 'Draft'}
          </span>
        </div>

        <div className="flex items-center gap-4 pt-6">
          <button disabled={saving || !title || !content} type="submit" className="px-6 py-2.5 rounded-lg bg-primary text-white">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {message && <div className={`text-sm font-medium ${message.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>}
        </div>
      </form>
    </div>
  )
}
