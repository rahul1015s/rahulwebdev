"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Edit, Trash2, Eye, EyeOff, MoreHorizontal, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'


interface Props { posts: any[] }

export default function PostTable({ posts }: Props) {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [bulkDeleting, setBulkDeleting] = useState(false)

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

  const handleSelectPost = (postId: string, checked: boolean) => {
    if (checked) {
      setSelectedPosts(prev => [...prev, postId])
    } else {
      setSelectedPosts(prev => prev.filter(id => id !== postId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPosts(posts.map(p => p._id))
    } else {
      setSelectedPosts([])
    }
  }

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedPosts.length} selected posts? This action cannot be undone.`)) return

    setBulkDeleting(true)
    try {
      const deletePromises = selectedPosts.map(id =>
        fetch(`/api/admin/posts/${id}`, { method: 'DELETE' })
      )

      await Promise.all(deletePromises)
      setSelectedPosts([])
      window.location.reload()
    } catch (err: any) {
      alert(`Bulk delete failed: ${err.message || err}`)
    } finally {
      setBulkDeleting(false)
    }
  }

  const handleTogglePublish = async (post: any) => {
    try {
      const res = await fetch(`/api/admin/posts/${post._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !post.published })
      })
      const data = await res.json()
      if (data.ok) {
        window.location.reload()
      } else {
        alert(`Failed to update status: ${data.error}`)
      }
    } catch (err: any) {
      alert(String(err.message || err))
    }
  }

  const handleDelete = async (post: any) => {
    if (!confirm('Delete this post? This action cannot be undone.')) return
    try {
      const res = await fetch(`/api/admin/posts/${post._id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.ok) {
        window.location.reload()
      } else {
        alert(`Delete failed: ${data.error}`)
      }
    } catch (err: any) {
      alert(String(err.message || err))
    }
  }

  return (
    <div className="space-y-4">
      {selectedPosts.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
          <span className="text-sm font-medium">{selectedPosts.length} posts selected</span>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleBulkDelete}
            disabled={bulkDeleting}
          >
            <Trash className="w-4 h-4 mr-2" />
            {bulkDeleting ? 'Deleting...' : 'Delete Selected'}
          </Button>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedPosts.length === posts.length && posts.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedPosts.includes(post._id)}
                    onCheckedChange={(checked) => handleSelectPost(post._id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="max-w-[300px] truncate">{post.title}</div>
                </TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">{post.slug}</code>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {post.createdAt ? formatDate(post.createdAt) : 'N/A'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleTogglePublish(post)}>
                        {post.published ? (
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
                      <DropdownMenuItem onClick={() => handleDelete(post)} className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}