"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Edit, Trash2, Eye, EyeOff, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import api from '@/lib/api'
import { getApiErrorMessage } from '@/lib/api-error'

interface Props { post: any }

export default function PostRow({ post }: Props) {
  const [removed, setRemoved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  if (removed) return null

  async function handleDelete() {
    if (!confirm('Delete this post? This action cannot be undone.')) return
    setLoading(true)
    try {
      const res = await api.delete(`/api/admin/posts/${post._id}`)
      const data = res.data

      if (data?.ok !== false) {
        setRemoved(true)
        console.log('Delete successful', data)
      } else {
        const errMsg = data?.error || 'Delete failed'
        console.error('Delete failed', data)
        alert(`Delete failed: ${errMsg}`)
      }
    } catch (err: any) {
      console.error('Delete request error', err)
      alert(getApiErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  async function handleTogglePublish() {
    setUpdating(true)
    try {
      const res = await api.patch(`/api/admin/posts/${post._id}`, { published: !post.published })
      const data = res.data

      if (data?.ok !== false) {
        // Update the post object to reflect the change
        post.published = !post.published
        // Force re-render by updating state
        setUpdating(false)
        window.location.reload() // Simple way to refresh the UI
      } else {
        const errMsg = data?.error || 'Update failed'
        console.error('Toggle failed', data)
        alert(`Failed to update status: ${errMsg}`)
      }
    } catch (err: any) {
      console.error('Toggle request error', err)
      alert(getApiErrorMessage(err))
    } finally {
      setUpdating(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return 'Invalid date'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-lg truncate">{post.title}</h3>
              <Badge variant={post.published ? "default" : "secondary"}>
                {post.published ? (
                  <>
                    <Eye className="w-3 h-3 mr-1" />
                    Published
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3 h-3 mr-1" />
                    Draft
                  </>
                )}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              Slug: <code className="bg-muted px-1 py-0.5 rounded text-xs">{post.slug}</code>
            </div>
            {post.createdAt && (
              <div className="text-sm text-muted-foreground">
                Created: {formatDate(post.createdAt)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleTogglePublish} disabled={updating}>
                  {updating ? 'Updating...' : post.published ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Move to Draft
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Publish
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/blog/${post._id}/edit`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} disabled={loading} className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  {loading ? 'Deleting...' : 'Delete'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
