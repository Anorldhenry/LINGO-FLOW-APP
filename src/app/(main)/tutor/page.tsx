'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { X, Send, Bot, Loader2, Sparkles, Lightbulb } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  tip?: string
}

const QUICK_PROMPTS = [
  "How do I say 'I am lost'?",
  "Explain basic greetings",
  "How are you?",
  "Give me a study tip"
]

function TutorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const rawLang = searchParams.get('lang') || 'Arabic'
  
  const langNames: Record<string, string> = {
    'ar': 'Arabic', 'arabic': 'Arabic',
    'de': 'German', 'german': 'German',
    'fr': 'French', 'french': 'French',
    'lg': 'Luganda', 'luganda': 'Luganda',
    'sw': 'Kiswahili', 'kiswahili': 'Kiswahili',
    'ny': 'Runyankore', 'runyankore': 'Runyankore'
  }

  // Determine the display name (e.g. "Luganda")
  const langKey = langNames[rawLang.toLowerCase()] || rawLang

  // Determine the code for API calls (e.g. "ar", "lg")
  const langCode = Object.keys(langNames).find(key => langNames[key] === langKey) || 'ar'

  const [messages, setMessages] = useState<Message[]>([])
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null)
  const [showPaywall, setShowPaywall] = useState(false)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    async function checkSubscription() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('subscription_tier, subscription_expiry')
            .eq('id', user.id)
            .single()
          
          if (profile && profile.subscription_tier && profile.subscription_tier !== 'free') {
            setIsSubscribed(true)
          } else {
            setIsSubscribed(false)
            setShowPaywall(true)
          }
        }
      } catch (err) {
        console.error("Subscription check failed:", err)
      } finally {
        setIsLoadingProfile(false)
      }
    }

    async function loadHistory() {
      try {
        const res = await fetch(`/api/tutor/history?lang=${langCode}`)
        const data = await res.json()
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages)
        } else {
          setMessages([{
            id: 'init',
            role: 'assistant',
            content: `Hey there! I'm Lingo, your personal AI Coach. Let's practice some ${langKey} together! What do you want to talk about?`
          }])
        }
      } catch (err) {
        console.error("Failed to load history:", err)
      } finally {
        setIsHistoryLoaded(true)
      }
    }

    checkSubscription()
    loadHistory()
  }, [langKey])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => scrollToBottom(), [messages, isTyping])

  const handleSubscribe = async (tier: string) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Fake subscription logic for demo
    await supabase.from('profiles').update({
      subscription_tier: tier,
      subscription_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    }).eq('id', user.id)

    setIsSubscribed(true)
    setShowPaywall(false)
  }

  const handleSend = async (text: string) => {
    if (!text.trim() || !isSubscribed) {
      if (!isSubscribed) setShowPaywall(true)
      return
    }

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content, lang: langKey })
      })

      if (res.status === 403) {
        setIsSubscribed(false)
        setShowPaywall(true)
        return
      }

      const data = await res.json()
      
      const botMessage: Message = { 
        id: Date.now().toString() + 'bot', 
        role: 'assistant', 
        content: data.response,
        tip: data.tip
      }
      setMessages(prev => [...prev, botMessage])

    } catch (err) {
      console.error(err)
    } finally {
      setIsTyping(false)
    }
  }

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#58CC02]" />
        <p className="font-bold text-bold animate-pulse">Initializing Coach Lingo...</p>
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col font-sans relative">
      
      {/* Paywall Overlay */}
      {showPaywall && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="bg-surface w-full max-w-md rounded-[28px] border-2 border-border-color shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
              <div className="p-6 bg-primary text-white relative">
                 <button onClick={() => router.push('/dashboard')} className="absolute top-4 right-4 p-2 bg-black/20 rounded-full hover:bg-black/40 transition-colors">
                    <X className="h-5 w-5" />
                 </button>
                 <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm border-2 border-white/30">
                    <Sparkles className="h-8 w-8 text-white fill-current" />
                 </div>
                 <h2 className="text-2xl font-black mb-1 leading-tight italic uppercase tracking-tighter text-white">Unlock Unlimited {langKey}</h2>
                 <p className="font-bold opacity-90 text-sm">Practice with Coach Lingo 24/7 and master {langKey} 3x faster.</p>
              </div>

              <div className="p-6 space-y-3">
                <div className="grid gap-2">
                  {/* Weekly Option */}
                  <button onClick={() => handleSubscribe('weekly')} className="group flex items-center justify-between p-3 rounded-2xl border-2 border-border-color hover:border-neutral-400 transition-all text-left">
                    <div>
                      <h4 className="font-extrabold text-foreground text-sm">Weekly Pro</h4>
                      <p className="text-[10px] font-bold text-muted uppercase tracking-widest leading-none mt-0.5">Short term access</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-foreground">$9.99</span>
                      <p className="text-[9px] font-bold text-muted line-through">$1.42 / day</p>
                    </div>
                  </button>

                  {/* Monthly Option - Best Value */}
                  <button onClick={() => handleSubscribe('monthly')} className="group relative flex items-center justify-between p-4 rounded-2xl border-4 border-[#58CC02] bg-[#58CC02]/5 hover:bg-[#58CC02]/10 transition-all text-left transform hover:scale-[1.02]">
                    <div className="absolute -top-3 left-6 bg-[#58CC02] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">Best Value</div>
                    <div>
                      <h4 className="font-extrabold text-foreground text-base">Monthly Pro</h4>
                      <p className="text-[10px] font-bold text-[#58CC02] uppercase tracking-widest leading-none mt-0.5">Saves 50% vs Weekly</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-[#58CC02]">$19.99</span>
                      <p className="text-[9px] font-bold text-[#58CC02] opacity-70">Only $0.66 / day</p>
                    </div>
                  </button>

                  {/* Family Option */}
                  <button onClick={() => handleSubscribe('family')} className="group flex items-center justify-between p-3 rounded-2xl border-2 border-[#1CB0F6] bg-[#1CB0F6]/5 hover:bg-[#1CB0F6]/10 transition-all text-left border-b-6 active:border-b-2 active:translate-y-1">
                    <div>
                      <h4 className="font-extrabold text-foreground text-sm">Family Plan</h4>
                      <p className="text-[10px] font-bold text-[#1CB0F6] uppercase tracking-widest leading-none mt-0.5">Up to 5 Learners</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-foreground">$29.99</span>
                      <p className="text-[9px] font-bold text-[#1CB0F6]">Best for Groups</p>
                    </div>
                  </button>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                   <p className="text-[10px] text-center font-bold text-muted">No commitment. Cancel anytime in your dashboard settings.</p>
                   <button onClick={() => router.push('/dashboard')} className="text-xs font-bold text-muted hover:text-foreground underline underline-offset-4 text-center">Maybe later</button>
                </div>
              </div>
           </div>
        </div>
      )}
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-surface border-b-2 border-border-color z-50 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#58CC02] rounded-full border-b-4 border-[#357B00] flex items-center justify-center relative shadow-sm overflow-hidden p-1.5">
               <img src="/assets/logo-transparent.png" className="w-full h-full object-contain" alt="Logo" />
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#58CC02] rounded-full border-2 border-surface"></div>
            </div>
            <div>
              <h1 className="font-extrabold text-foreground text-sm sm:text-base">Coach Lingo</h1>
              <p className="text-[10px] font-bold text-bold uppercase tracking-widest">Active Now</p>
            </div>
          </div>
          <button onClick={() => router.push('/dashboard')} className="p-2 text-bold hover:text-foreground transition-colors rounded-xl hover:bg-border-color">
            <X className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Chat History Canvas */}
      <main className="flex-1 max-w-3xl mx-auto w-full pt-20 pb-40 px-4 flex flex-col gap-6">
        
        {/* Mascot Welcome - Premium Animation */}
        <div className="flex flex-col items-center gap-2 my-4 animate-in fade-in zoom-in duration-700">
           <div className="w-20 h-20 md:w-24 md:h-24">
             <img 
               src={isTyping ? '/assets/mascot_think.png' : '/assets/mascot_idle.png'} 
               alt="Lingo Mascot" 
               className={`w-full h-auto object-contain ${isTyping ? 'animate-thinking' : 'animate-float'}`}
             />
           </div>
           <p className="text-[11px] font-black text-bold uppercase tracking-[0.2em]">Coach Lingo is listening...</p>
        </div>

        {messages.map((msg, idx) => {
          const isBot = msg.role === 'assistant'
          return (
            <div key={msg.id} className={`flex flex-col w-full ${isBot ? 'items-start' : 'items-end'}`}>
              <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'}`}>
                {isBot && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#58CC02] flex items-center justify-center mt-auto mb-1 mr-2 border-b-2 border-[#357B00] shadow-sm overflow-hidden p-1">
                      <img src="/assets/logo-transparent.png" className="w-full h-full object-contain" alt="Logo" />
                  </div>
                )}

                <div className={`
                  max-w-[85%] p-4 rounded-[24px] text-[15px] font-medium leading-relaxed shadow-sm transition-all animate-in slide-in-from-bottom-2 duration-300
                  ${isBot 
                    ? 'bg-surface text-foreground border-2 border-border-color border-b-[6px] rounded-bl-sm' 
                    : 'bg-[#58CC02] text-white border-2 border-[#357B00] border-b-[6px] rounded-br-[4px]'}
                `}>
                  {msg.content}
                </div>
              </div>
              
              {/* Lingo Tip Box */}
              {msg.tip && (
                <div className="mt-3 ml-10 mr-4 bg-[#FFC800]/10 border-2 border-[#FFC800]/20 rounded-2xl p-3 flex gap-3 animate-in fade-in slide-in-from-left-2 duration-500">
                  <div className="bg-[#FFC800] p-1.5 rounded-lg h-fit text-yellow-900">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-bold text-yellow-900 leading-tight">
                    {msg.tip}
                  </p>
                </div>
              )}
            </div>
          )
        })}

        {isTyping && (
           <div className="flex w-full justify-start items-end gap-2">
             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#58CC02] flex items-center justify-center mb-1 border-b-2 border-[#357B00] shadow-sm overflow-hidden p-1">
                <img src="/assets/logo-transparent.png" className="w-full h-full object-contain" alt="Logo" />
             </div>
             <div className="bg-surface px-5 py-4 border-2 border-border-color border-b-[6px] rounded-[24px] rounded-bl-sm flex items-center gap-1.5 h-[48px] animate-pulse">
                <span className="w-2 h-2 bg-[#AFAFBC] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-[#AFAFBC] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-[#AFAFBC] rounded-full animate-bounce"></span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Persistent Input & Quick Prompts Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t-2 border-border-color z-50 pt-2 pb-6 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          
          {/* Quick Prompts - Horizontal Scroll */}
          {!messages.some(m => m.role === 'user') && messages.length <= 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide py-1">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap px-4 py-2 rounded-xl border-2 border-border-color border-b-4 text-xs font-bold text-bold hover:border-[#58CC02] hover:text-[#58CC02] transition-all bg-surface"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input) }} 
            className="flex items-center gap-3 bg-surface-hover border-2 border-border-color focus-within:border-[#58CC02] focus-within:bg-surface rounded-[24px] p-2 transition-all shadow-sm"
          >
            <div className="pl-3 text-[#58CC02]">
               <Sparkles className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isOnline ? `Chat in ${langKey}...` : "You are currently offline"}
              className="flex-1 bg-transparent border-none focus:outline-none text-foreground font-semibold text-sm px-1 py-3 disabled:cursor-not-allowed"
              disabled={isTyping || !isOnline}
            />
            <button 
              type="submit" 
              disabled={isTyping || !input.trim() || !isOnline}
              className="w-12 h-12 bg-[#58CC02] hover:bg-[#46A302] rounded-[18px] flex items-center justify-center disabled:opacity-50 transition-all border-b-4 border-[#357B00] active:border-b-0 active:translate-y-1 shadow-sm"
            >
               {isTyping ? <Loader2 className="h-5 w-5 text-white animate-spin" /> : <Send className="h-5 w-5 text-white" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function TutorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#58CC02]"/></div>}>
      <TutorContent />
    </Suspense>
  )
}
