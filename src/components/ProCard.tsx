'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PaymentModal } from '@/components/PaymentModal'

export function ProCard({ userId }: { userId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-[#58CC02] p-6 rounded-[48px] border-b-[6px] border-[#357B00] flex items-center justify-between group hover:brightness-105 transition-all shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-125 transition-transform duration-700">
          <Sparkles className="h-24 w-24 text-white" />
        </div>
        <div className="text-left z-10">
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            Upgrade to Lingo Flow Pro 
            <span className="bg-white text-[#58CC02] text-[10px] px-2 py-0.5 rounded-md shadow-sm">SAVE 50%</span>
          </h3>
          <p className="text-white/90 font-medium text-sm mt-1 max-w-md">Get unlimited AI coaching, ad-free experience, and master languages 3x faster with Coach Lingo.</p>
          <div className="mt-4 inline-flex items-center gap-2 text-white font-bold text-sm">
            View Pricing Plans →
          </div>
        </div>
      </button>

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => router.refresh()}
        userId={userId}
      />
    </>
  )
}
