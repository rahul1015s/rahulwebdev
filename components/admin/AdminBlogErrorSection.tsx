"use client"

import { Button } from '@/components/ui/button'

interface AdminBlogErrorSectionProps {
  error: string
}

export default function AdminBlogErrorSection({ error }: AdminBlogErrorSectionProps) {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div className="text-center py-8">
      <p className="text-red-600 mb-4">{error}</p>
      <Button variant="outline" onClick={handleReload}>
        Try Again
      </Button>
    </div>
  )
}
