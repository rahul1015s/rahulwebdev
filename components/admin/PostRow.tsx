"use client"
import React, { useState } from 'react'
import Link from 'next/link'

interface Props { post: any }

export default function PostRow({ post }: Props) {
  const [removed, setRemoved] = useState(false)
  const [loading, setLoading] = useState(false)
  if (removed) return null

  async function handleDelete() {
    if (!confirm('Delete this post? This action cannot be undone.')) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/posts/${post._id}`, { method: 'DELETE' })
      let data: any = null
      try {
        data = await res.json()
      } catch (e) {
        console.error('Delete: failed to parse JSON response', e)
      }

      if (res.ok && data?.ok !== false) {
        setRemoved(true)
        console.log('Delete successful', { status: res.status, data })
      } else {
        const errMsg = data?.error || `HTTP ${res.status}`
        console.error('Delete failed', { status: res.status, data })
        alert(`Delete failed: ${errMsg}`)
      }
    } catch (err: any) {
      console.error('Delete request error', err)
      alert(String(err.message || err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <li key={post._id} className="border rounded p-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="font-medium">{post.title}</div>
          <div className="text-sm text-muted-foreground">{post.slug}</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            {post.createdAt ? (
              <time dateTime={new Date(post.createdAt).toISOString()}>
                {new Date(post.createdAt).toISOString()}
              </time>
            ) : ''}
          </div>
          <Link href={`/admin/blog/${post._id}/edit`} className="text-sm text-primary hover:underline">Edit</Link>
          <button type="button" onClick={handleDelete} disabled={loading} className="text-sm text-red-600 hover:underline">
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </li>
  )
}
