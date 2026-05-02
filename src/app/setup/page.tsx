'use client'

import { useState, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, Loader2, ArrowLeft } from 'lucide-react'

import { LANGUAGES } from '@/lib/languages'
function SetupContent() {
  const [selected, setSelected] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  
  const isFromSettings = searchParams.get('source') === 'settings'

  const handleContinue = async () => {
    if (!selected) return
    setIsLoading(true)
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Save the language to their profile (using upsert to ensure row exists)
        const { error } = await supabase
          .from('profiles')
          .upsert({ 
            id: user.id,
            target_language: selected,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' })
          
        if (error) {
          console.error("Database update failed. Proceeding locally...")
        }
      }
      // Force refresh data on dashboard
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 text-center">
      
      {/* Top Navigation for Settings Source */}
      {isFromSettings && (
        <button 
          onClick={() => router.push('/dashboard')}
          className="absolute top-8 left-8 flex items-center gap-2 text-bold hover:text-muted font-bold text-sm transition-colors"
        >
          <ArrowLeft className="h-5 w-5" /> Back to Dashboard
        </button>
      )}

      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-6">
           <img src="/assets/logo-transparent.png" alt="Logo" className="h-16 w-auto" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
          {isFromSettings ? 'Switch Language' : 'What do you want to learn?'}
        </h1>
        <p className="text-lg text-bold font-bold mb-8">
          {isFromSettings ? 'Choose a new language to start practicing!' : 'Choose a language to start your journey.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {LANGUAGES.map((lang) => {
            const isSelected = selected === lang.name

            return (
              <button
                key={lang.id}
                onClick={() => setSelected(lang.name)}
                className={`
                  relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200
                  ${isSelected ? `border-[#58CC02] bg-info-bg border-b-[4px]` : `border-border-color border-b-[4px] hover:bg-surface-hover`}
                  active:border-b-2 active:translate-y-1
                `}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 h-6 w-6 bg-[#58CC02] rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
                <span className="text-5xl mb-4">{lang.flag}</span>
                <span className={`text-xl font-bold ${isSelected ? 'text-[#58CC02]' : 'text-foreground'}`}>
                  {lang.name}
                </span>
              </button>
            )
          })}
        </div>

        <div className="w-full border-t-2 border-border-color pt-6 flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selected || isLoading}
            className={`
              w-full sm:w-auto min-w-[200px] uppercase tracking-widest text-sm font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all
              ${selected 
                ? 'bg-[#58CC02] hover:bg-[#46A302] text-white border-b-4 border-[#46A302] active:border-b-0 active:translate-y-1 cursor-pointer' 
                : 'bg-border-color text-bold cursor-not-allowed'
              }
            `}
          >
            {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
            {isFromSettings ? 'Save & Switch' : 'Continue'}
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default function SetupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#58CC02]" />
      </div>
    }>
      <SetupContent />
    </Suspense>
  )
}
