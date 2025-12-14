"use client"

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DeleteCaseStudyButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm('Delete this case study? This action cannot be undone.')) return

    try {
      const res = await fetch(`/api/admin/case-studies/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        window.location.reload()
      } else {
        const data = await res.json()
        alert(`Error: ${data.error || 'Delete failed'}`)
      }
    } catch (err: any) {
      alert(`Error: ${err.message}`)
    }
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      <Trash2 className="w-4 h-4 mr-2" />
      Delete
    </Button>
  )
}
