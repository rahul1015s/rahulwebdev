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
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [tagline, setTagline] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [gallery, setGallery] = useState('')
  const [stack, setStack] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [featured, setFeatured] = useState(false)
  const [category, setCategory] = useState('')
  const [deliverables, setDeliverables] = useState('')
  const [timeline, setTimeline] = useState('')
  const [client, setClient] = useState('')
  const [team, setTeam] = useState('')
  const [challenges, setChallenges] = useState('')
  const [solutions, setSolutions] = useState('')
  const [results, setResults] = useState('')
  const [published, setPublished] = useState(false)
  const [order, setOrder] = useState(0)
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
          setName(s.name || '')
          setSlug(s.slug || '')
          setTagline(s.tagline || '')
          setDescription(s.description || '')
          setCoverImage(s.coverImage || '')
          setGallery((s.gallery || []).join(', '))
          setStack((s.stack || []).join(', '))
          setLiveUrl(s.liveUrl || '')
          setGithubUrl(s.githubUrl || '')
          setFeatured(s.featured || false)
          setCategory((s.category || []).join(', '))
          setDeliverables((s.deliverables || []).join(', '))
          setTimeline(s.timeline || '')
          setClient(s.client || '')
          setTeam((s.team || []).join(', '))
          setChallenges((s.challenges || []).join(', '))
          setSolutions((s.solutions || []).join(', '))
          setResults((s.results || []).join(', '))
          setPublished(s.published || false)
          setOrder(s.order || 0)
          // Handle content - could be string or object
          if (typeof s.content === 'string') {
            setContent(s.content)
          } else if (s.content) {
            setContent(JSON.stringify(s.content))
          } else {
            setContent('')
          }
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
      const galleryArray = gallery.split(',').map(s=>s.trim()).filter(Boolean)
      const stackArray = stack.split(',').map(s=>s.trim()).filter(Boolean)
      const categoryArray = category.split(',').map(s=>s.trim()).filter(Boolean)
      const deliverablesArray = deliverables.split(',').map(s=>s.trim()).filter(Boolean)
      const teamArray = team.split(',').map(s=>s.trim()).filter(Boolean)
      const challengesArray = challenges.split(',').map(s=>s.trim()).filter(Boolean)
      const solutionsArray = solutions.split(',').map(s=>s.trim()).filter(Boolean)
      const resultsArray = results.split(',').map(s=>s.trim()).filter(Boolean)

      const res = await fetch(`/api/admin/case-studies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          slug,
          tagline,
          description,
          content,
          coverImage,
          gallery: galleryArray,
          stack: stackArray,
          liveUrl,
          githubUrl,
          featured,
          category: categoryArray,
          deliverables: deliverablesArray,
          timeline,
          client,
          team: teamArray,
          challenges: challengesArray,
          solutions: solutionsArray,
          results: resultsArray,
          published,
          order
        })
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Slug</label>
            <input value={slug} onChange={(e)=>setSlug(e.target.value)} className="w-full rounded-lg border px-4 py-2.5 text-xs text-muted-foreground" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Tagline</label>
          <input value={tagline} onChange={(e)=>setTagline(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={3} className="w-full rounded-lg border px-4 py-2.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Cover Image URL</label>
            <input value={coverImage} onChange={(e)=>setCoverImage(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Gallery URLs (comma separated)</label>
            <input value={gallery} onChange={(e)=>setGallery(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Tech Stack (comma separated)</label>
            <input value={stack} onChange={(e)=>setStack(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Category (comma separated)</label>
            <input value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Live URL</label>
            <input value={liveUrl} onChange={(e)=>setLiveUrl(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">GitHub URL</label>
            <input value={githubUrl} onChange={(e)=>setGithubUrl(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Client</label>
            <input value={client} onChange={(e)=>setClient(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Timeline</label>
            <input value={timeline} onChange={(e)=>setTimeline(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Team (comma separated)</label>
          <input value={team} onChange={(e)=>setTeam(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Deliverables (comma separated)</label>
          <input value={deliverables} onChange={(e)=>setDeliverables(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Challenges (comma separated)</label>
          <input value={challenges} onChange={(e)=>setChallenges(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Solutions (comma separated)</label>
          <input value={solutions} onChange={(e)=>setSolutions(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Results (comma separated)</label>
          <input value={results} onChange={(e)=>setResults(e.target.value)} className="w-full rounded-lg border px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Content</label>
          <NovelEditor value={content} onChange={setContent} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3 p-4 rounded-lg border border-border/50 bg-muted/30">
            <input 
              type="checkbox" 
              id="featured"
              checked={featured} 
              onChange={(e)=>setFeatured(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="featured" className="text-sm font-semibold cursor-pointer flex-1">
              Featured Project
            </label>
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
            <span className={`text-xs font-medium px-2 py-1 rounded ${published ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
              {published ? 'Published' : 'Draft'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Order</label>
          <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} className="w-full rounded-lg border px-4 py-2.5" />
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button disabled={saving} type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">{saving ? 'Saving…' : 'Save changes'}</button>
          {message && <div className={`text-sm font-medium ${message.startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>}
        </div>
      </form>
    </div>
  )
}
