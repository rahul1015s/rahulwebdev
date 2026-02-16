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
    try {
      const res = await api.post('/api/categories', { name: newCategoryName })
      const data = res.data
      if (data._id) {
        setCategories([...categories, data])
        setSelectedCategory(data._id)
        setNewCategoryName('')
        setShowNewCategoryModal(false)
      }
    } catch (err) {
      console.error('Failed to create category:', getApiErrorMessage(err))
    } finally {
      setCreatingCategory(false)
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

        {/* Category Selector */}
        <div>
          <label className="block text-sm font-semibold mb-2">Category *</label>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              disabled={loadingCategories}
              className="flex-1 rounded-lg border border-border/50 px-4 py-2.5 bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
              required
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
              className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
            >
              + New
            </button>
          </div>
          {loadingCategories && <p className="text-xs text-muted-foreground mt-1">Loading categories...</p>}
        </div>

        {/* Create Category Modal */}
        {showNewCategoryModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowNewCategoryModal(false)}>
            <div className="bg-background rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold mb-4">Create New Category</h3>
              <input
                autoFocus
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name..."
                className="w-full rounded-lg border border-border/50 px-4 py-2.5 bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all mb-4"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateCategory()
                  if (e.key === 'Escape') setShowNewCategoryModal(false)
                }}
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowNewCategoryModal(false)}
                  className="px-4 py-2 rounded-lg border border-border/50 hover:bg-muted transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  disabled={!newCategoryName.trim() || creatingCategory}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
                >
                  {creatingCategory ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tags Selector */}
        <div>
          <label className="block text-sm font-semibold mb-2">Tags</label>
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
              className="w-full rounded-lg border border-border/50 px-4 py-2.5 bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
            />
            
            {/* Dropdown suggestions */}
            {showTagDropdown && filteredTags.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border/50 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {filteredTags.map(tag => (
                  <div
                    key={tag._id}
                    onClick={(e) => {
                      e.preventDefault()
                      handleAddTag(tag)
                      setShowTagDropdown(false)
                    }}
                    className="px-4 py-2 hover:bg-muted transition-colors text-sm cursor-pointer"
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
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm"
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

        <div className="flex items-center gap-3 p-4 rounded-lg border border-border/50 bg-muted/30" suppressHydrationWarning>
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
