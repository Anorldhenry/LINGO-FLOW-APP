'use client'

import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function DeletePostButton({ postId }: { postId: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to permanently delete this community post?')) return
    
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/community?id=${postId}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        router.refresh()
      } else {
        alert('Failed to delete post.')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 bg-error-bg text-[#EA2B2B] hover:bg-[#EA2B2B] hover:text-white rounded-xl transition-colors shrink-0 disabled:opacity-50"
      title="Delete Post"
    >
      {isDeleting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
    </button>
  )
}
