import { Loader2 } from 'lucide-react'

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-border-color border-t-[#58CC02] rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
            <img src="/assets/logo-transparent.png" alt="Lingo" className="w-8 h-8 object-contain animate-pulse" />
        </div>
      </div>
      <p className="mt-8 text-bold font-bold animate-pulse tracking-widest uppercase text-xs">
        Preparing your learning journey...
      </p>
    </div>
  )
}
