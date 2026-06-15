"use client"
import React, { useEffect, useState, use as reactUse } from 'react'
import { useRouter } from 'next/navigation'
import NovelEditor from '@/components/admin/NovelEditor'
import CoverImageField from '@/components/admin/CoverImageField'
import { Checkbox } from '@/components/ui/checkbox'
import api from '@/lib/api'
import { getApiErrorMessage } from '@/lib/api-error'

type EditPostParams = Promise<{ id: string }> | { id: string }
type PostResponse = {
  ok?: boolean
  error?: string
  post?: {
    title?: string
    slug?: string
    content?: string
    image?: string
    published?: boolean
  }
}

export default function EditPostPage({ params }: { params: EditPostParams }) {
  const resolvedParams = reactUse(params as Promise<{ id: string }>)
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

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await api.get(`/api/admin/posts/${id}`)
        const data = res.data
        if (data?.ok && data.post && mounted) {
          setTitle(data.post.title || '')
          setSlug(data.post.slug || '')
          setContent(data.post.content || '')
          setImage(data.post.image || '')
          setPublished(data.post.published || false)
        } else {
          setMessage('Failed to load post')
        }
      } catch (error: unknown) {
        setMessage(getApiErrorMessage(error))
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
      const res = await api.patch(`/api/admin/posts/${id}`, { title, slug, content, image, published })
      const data = res.data as PostResponse
      if (data?.ok !== false) {
        setMessage('✓ Saved')
        // Optionally navigate back to admin list after save
        setTimeout(() => {
          setMessage(null)
          router.push('/admin/blog')
        }, 800)
      } else {
        console.error('Save failed', data)
        setMessage(`✗ ${data?.error || 'Save failed'}`)
      }
    } catch (error: unknown) {
      setMessage(getApiErrorMessage(error))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8">Loading…</div>

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <h1 className="mb-1 text-2xl font-semibold tracking-tight">Edit Post</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Title *</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className="h-10 w-full rounded-md border border-border/60 px-3 text-sm" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Slug</label>
          <input value={slug} onChange={(e) => setSlug(slugify(e.target.value))} className="h-10 w-full rounded-md border border-border/60 px-3 text-sm text-muted-foreground" />
        </div>

        <div>
          <CoverImageField value={image} onChange={setImage} />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Content *</label>
          <NovelEditor value={content} onChange={setContent} />
        </div>

        <div className="flex items-center gap-3 rounded-md border border-border/50 bg-muted/20 p-3">
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

        <div className="flex items-center gap-3 pt-3">
          <button disabled={saving || !title || !content} type="submit" className="h-10 rounded-md bg-primary px-5 text-sm font-medium text-white">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {message && <div className={`text-sm font-medium ${message.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>}
        </div>
      </form>
    </div>
  )
}
