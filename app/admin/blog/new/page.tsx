"use client"
import React, { useState, useRef, useEffect } from 'react'
import NovelEditor from '@/components/admin/NovelEditor'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import api from '@/lib/api'
import { getApiErrorMessage } from '@/lib/api-error'

interface Category {
  _id: string
  name: string
  slug: string
}

interface Tag {
  _id: string
  name: string
  slug: string
}

export default function NewPostPage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [published, setPublished] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [resetKey, setResetKey] = useState(0)
  
  // Category and Tags
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [tagInput, setTagInput] = useState('')
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [showTagDropdown, setShowTagDropdown] = useState(false)
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [creatingCategory, setCreatingCategory] = useState(false)
  const [categoryMessage, setCategoryMessage] = useState<string | null>(null)
  const [slugTouched, setSlugTouched] = useState(false)

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

  // Fetch categories and tags on mount
  useEffect(() => {
    Promise.all([
      api.get('/api/categories'),
      api.get('/api/tags')
    ]).then(([catsResponse, tagsResponse]) => {
      setCategories(catsResponse.data)
      setAllTags(tagsResponse.data)
      setLoadingCategories(false)
    }).catch(err => {
      console.error('Failed to fetch categories/tags:', err)
      setLoadingCategories(false)
    })
  }, [])

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title))
  }, [title, slugTouched])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const res = await api.post('/api/admin/posts', { 
        title, 
        slug, 
        content, 
        image, 
        published,
        category: selectedCategory || null,
        tags: selectedTags.map(t => t._id)
      })
      const data = res.data
      if (data.ok) {
        setMessage('✓ Post created successfully')
        // Clear form and reset editor
        setTitle('')
        setSlug('')
        setSlugTouched(false)
        setContent('')
        setImage('')
        setPublished(false)
        setSelectedCategory('')
        setSelectedTags([])
        setTagInput('')
        setResetKey((k) => k + 1)
        
        // Clear success message after 3 seconds
        setTimeout(() => setMessage(null), 3000)
      } else {
        setMessage(`✗ Error: ${data.error || 'unknown'}`)
      }
    } catch (err: any) {
      setMessage(`✗ ${getApiErrorMessage(err)}`)
    } finally {
      setLoading(false)
    }
  }

  // Handle tag selection
  const handleAddTag = (tag: Tag) => {
    if (!selectedTags.find(t => t._id === tag._id)) {
      setSelectedTags([...selectedTags, tag])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(t => t._id !== tagId))
  }

  // Filter tags for input
  const filteredTags = tagInput.trim() 
    ? allTags.filter(t => 
        t.name.toLowerCase().includes(tagInput.toLowerCase()) &&
        !selectedTags.find(st => st._id === t._id)
      )
    : []

  // Handle create new category
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return

    setCreatingCategory(true)
    setCategoryMessage(null)
    try {
      const res = await api.post('/api/categories', { name: newCategoryName })
      const data = res.data
      if (data._id) {
        setCategories((prev) =>
          [...prev, data].sort((a, b) => a.name.localeCompare(b.name))
        )
        setSelectedCategory(data._id)
        setNewCategoryName('')
        setShowNewCategoryModal(false)
        setCategoryMessage(`Category "${data.name}" created`)
        setTimeout(() => setCategoryMessage(null), 2500)
      }
    } catch (err: any) {
      const message = getApiErrorMessage(err)
      const existingCategory = err?.response?.data?.category
      if (existingCategory?._id) {
        setSelectedCategory(existingCategory._id)
        setShowNewCategoryModal(false)
        setCategoryMessage(`Category "${existingCategory.name}" already exists and is selected`)
        setTimeout(() => setCategoryMessage(null), 2500)
      } else {
        setCategoryMessage(message)
      }
      console.error('Failed to create category:', message)
    } finally {
      setCreatingCategory(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight mb-1">Create New Post</h1>
        <p className="text-sm text-muted-foreground">Write and publish your next blog post</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Title *</label>
          <input 
            required
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter post title..."
            className="h-10 w-full rounded-md border border-border/60 px-3 text-sm bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all" 
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Slug (optional)</label>
          <input 
            value={slug} 
            onChange={(e) => {
              setSlugTouched(true)
              setSlug(slugify(e.target.value))
            }}
            placeholder="leave-blank-for-auto-slug"
            className="h-10 w-full rounded-md border border-border/60 px-3 text-sm text-muted-foreground bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all" 
          />
          <p className="text-xs text-muted-foreground mt-1">Leave blank and slug will be auto-generated from title</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Content *</label>
          <NovelEditor key={resetKey} value={content} onChange={setContent} />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Image URL (optional)</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://... or drive://fileId"
            className="h-10 w-full rounded-md border border-border/60 px-3 text-sm"
          />
          <p className="text-xs text-muted-foreground mt-1">Optional cover image or featured image URL</p>
        </div>

        {/* Category Selector */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">Category (optional)</label>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              disabled={loadingCategories}
              className="h-10 flex-1 rounded-md border border-border/60 px-3 bg-background text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
            >
              <option value="">Select a category...</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowNewCategoryModal(true)}
              className="h-10 px-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
            >
              + New
            </button>
          </div>
          {loadingCategories && <p className="text-xs text-muted-foreground mt-1">Loading categories...</p>}
          {categoryMessage && <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">{categoryMessage}</p>}
        </div>

        {/* Create Category Modal */}
        {showNewCategoryModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowNewCategoryModal(false)}>
            <div className="bg-background rounded-lg p-5 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-base font-semibold mb-3">Create New Category</h3>
              <input
                autoFocus
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name..."
                className="h-10 w-full rounded-md border border-border/60 px-3 bg-background text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all mb-3"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateCategory()
                  if (e.key === 'Escape') setShowNewCategoryModal(false)
                }}
              />
              {categoryMessage && <p className="mb-2 text-xs text-red-600">{categoryMessage}</p>}
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowNewCategoryModal(false)}
                  className="h-9 px-3 rounded-md border border-border/50 hover:bg-muted transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  disabled={!newCategoryName.trim() || creatingCategory}
                  className="h-9 px-3 rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
                >
                  {creatingCategory ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tags Selector */}
        <div>
          <label className="mb-1.5 block text-sm font-medium">Tags</label>
          <div className="relative">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => {
                setTagInput(e.target.value)
                setShowTagDropdown(true)
              }}
              onFocus={() => setShowTagDropdown(true)}
              placeholder="Type to search and add tags..."
              className="h-10 w-full rounded-md border border-border/60 px-3 bg-background text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
            />
            
            {/* Dropdown suggestions */}
            {showTagDropdown && filteredTags.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border/50 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                {filteredTags.map(tag => (
                  <div
                    key={tag._id}
                    onClick={(e) => {
                      e.preventDefault()
                      handleAddTag(tag)
                      setShowTagDropdown(false)
                    }}
                    className="px-3 py-2 hover:bg-muted transition-colors text-sm cursor-pointer"
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected tags */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedTags.map(tag => (
                <div
                  key={tag._id}
                  className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs"
                >
                  {tag.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag._id)}
                    className="hover:text-emerald-900 dark:hover:text-emerald-200 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 p-3 rounded-md border border-border/50 bg-muted/20" suppressHydrationWarning>
          <Checkbox
            id="published"
            checked={published}
            onCheckedChange={(checked) => setPublished(checked as boolean)}
          />
          <label htmlFor="published" className="text-sm font-semibold cursor-pointer flex-1">
            Publish immediately
          </label>
          <span className={`text-xs font-medium px-2 py-1 rounded ${published ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'}`}>
            {published ? 'Published' : 'Draft'}
          </span>
        </div>

        <div className="flex items-center gap-3 pt-3">
          <button 
            disabled={loading || !title || !content} 
            type="submit" 
            className="h-10 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
