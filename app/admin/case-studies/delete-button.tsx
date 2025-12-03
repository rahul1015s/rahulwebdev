"use client"

export default function DeleteCaseStudyButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm('Delete this case study?')) return

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
    <button
      onClick={handleDelete}
      className="text-sm text-red-600 hover:text-red-700"
    >
      Delete
    </button>
  )
}
