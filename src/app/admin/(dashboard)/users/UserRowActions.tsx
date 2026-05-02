'use client'

import { useState } from 'react'
import { Sparkles, X, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function UserRowActions({ userId, currentTier }: { userId: string, currentTier: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const isPro = currentTier === 'pro'

  const handleTogglePro = async () => {
    setIsLoading(true)
    const newTier = isPro ? 'free' : 'pro'
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, tier: newTier })
      })
      
      if (res.ok) {
        router.refresh()
      } else {
        alert('Failed to update subscription status.')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred while updating the subscription.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
       {isPro && (
         <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ml-2">
            PRO
         </span>
       )}
       <button 
         onClick={handleTogglePro}
         disabled={isLoading}
         className={`p-2 rounded-xl transition-colors disabled:opacity-50 border-2 ${
           isPro 
            ? 'bg-surface hover:bg-error-bg text-bold hover:text-[#EA2B2B] border-border-color hover:border-[#EA2B2B]' 
            : 'bg-surface hover:bg-yellow-50 text-yellow-500 border-border-color hover:border-yellow-400'
         }`}
         title={isPro ? "Revoke Pro Status" : "Upgrade to Pro"}
       >
         {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
           isPro ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />
         )}
       </button>
    </div>
  )
}
