"use client"

import React, { useState } from 'react'
import NovelEditor from '@/components/admin/NovelEditor'
import api from '@/lib/api'
import { getApiErrorMessage } from '@/lib/api-error'

export default function NewCaseStudyPage() {
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
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [resetKey, setResetKey] = useState(0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const galleryArray = gallery.split(',').map(s => s.trim()).filter(Boolean)
      const stackArray = stack.split(',').map(s => s.trim()).filter(Boolean)
      const categoryArray = category.split(',').map(s => s.trim()).filter(Boolean)
      const deliverablesArray = deliverables.split(',').map(s => s.trim()).filter(Boolean)
      const teamArray = team.split(',').map(s => s.trim()).filter(Boolean)
      const challengesArray = challenges.split(',').map(s => s.trim()).filter(Boolean)
      const solutionsArray = solutions.split(',').map(s => s.trim()).filter(Boolean)
      const resultsArray = results.split(',').map(s => s.trim()).filter(Boolean)

      const res = await api.post('/api/admin/case-studies', {
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

      const data = res.data
      if (data.ok) {
        setMessage('✓ Case study created')
        setName('')
        setSlug('')
        setTagline('')
        setDescription('')
        setContent('')
        setCoverImage('')
        setGallery('')
        setStack('')
        setLiveUrl('')
        setGithubUrl('')
        setFeatured(false)
        setCategory('')
        setDeliverables('')
        setTimeline('')
        setClient('')
        setTeam('')
        setChallenges('')
        setSolutions('')
        setResults('')
        setPublished(false)
        setOrder(0)
        setResetKey((k) => k + 1)
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage(`✗ Error: ${data.error || 'unknown'}`)
      }
    } catch (err: any) {
      setMessage(getApiErrorMessage(err))
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Name *</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Slug (optional)</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated if empty" className="w-full rounded-lg border border-border/50 px-4 py-2.5 text-xs text-muted-foreground" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Tagline</label>
          <input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Brief tagline" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Project description" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Cover Image URL</label>
            <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="Google Drive / OneDrive / Dropbox or CDN URL" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Gallery URLs (comma separated)</label>
            <input value={gallery} onChange={(e) => setGallery(e.target.value)} placeholder="url1, url2, ..." className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Tech Stack (comma separated)</label>
            <input value={stack} onChange={(e) => setStack(e.target.value)} placeholder="React, Node.js, MongoDB" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Category (comma separated)</label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Web Development, Mobile App" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Live URL</label>
            <input value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} placeholder="https://example.com" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">GitHub URL</label>
            <input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/user/repo" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Client</label>
            <input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Client name" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Timeline</label>
            <input value={timeline} onChange={(e) => setTimeline(e.target.value)} placeholder="3 months, 2023-2024" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Team (comma separated)</label>
          <input value={team} onChange={(e) => setTeam(e.target.value)} placeholder="John Doe, Jane Smith" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Deliverables (comma separated)</label>
          <input value={deliverables} onChange={(e) => setDeliverables(e.target.value)} placeholder="Website, Mobile App, API" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Challenges (comma separated)</label>
          <input value={challenges} onChange={(e) => setChallenges(e.target.value)} placeholder="Challenge 1, Challenge 2" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Solutions (comma separated)</label>
          <input value={solutions} onChange={(e) => setSolutions(e.target.value)} placeholder="Solution 1, Solution 2" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Results (comma separated)</label>
          <input value={results} onChange={(e) => setResults(e.target.value)} placeholder="Result 1, Result 2" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Content *</label>
          <NovelEditor key={resetKey} value={content} onChange={setContent} />
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
              Publish immediately on /case-studies
            </label>
            <span className={`text-xs font-medium px-2 py-1 rounded ${published ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
              {published ? 'Published' : 'Draft'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Order</label>
          <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} placeholder="0" className="w-full rounded-lg border border-border/50 px-4 py-2.5" />
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button disabled={loading || !name || !content} type="submit" className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground">{loading ? 'Creating...' : 'Create Case Study'}</button>
          {message && <div className={`text-sm font-medium ${message.startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>}
        </div>
      </form>
    </div>
  )
}
