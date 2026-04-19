'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { X, Send, Bot, Loader2, Sparkles, Lightbulb } from 'lucide-react'

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
  const langKey = searchParams.get('lang') || 'Arabic'

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      content: `Hey there! I'm Lingo, your personal AI Coach. Let's practice some ${langKey} together! What do you want to talk about?`
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => scrollToBottom(), [messages, isTyping])

  const handleSend = async (text: string) => {
    if (!text.trim()) return

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

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col font-sans">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-surface border-b-2 border-border-color z-50 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#CE82FF] rounded-full border-b-4 border-[#9F56D2] flex items-center justify-center relative shadow-sm">
               <Bot className="h-6 w-6 text-white" />
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
               className={`w-full h-auto object-contain mix-blend-multiply ${isTyping ? 'animate-thinking' : 'animate-float'}`}
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
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#CE82FF] flex items-center justify-center mt-auto mb-1 mr-2 border-b-2 border-[#9F56D2] shadow-sm">
                      <Bot className="h-4 w-4 text-white" />
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
             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#CE82FF] flex items-center justify-center mb-1 border-b-2 border-[#9F56D2] shadow-sm">
                <Bot className="h-4 w-4 text-white" />
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
              placeholder={`Chat in ${langKey}...`}
              className="flex-1 bg-transparent border-none focus:outline-none text-foreground font-semibold text-sm px-1 py-3"
              disabled={isTyping}
            />
            <button 
              type="submit" 
              disabled={isTyping || !input.trim()}
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
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#CE82FF]"/></div>}>
      <TutorContent />
    </Suspense>
  )
}
