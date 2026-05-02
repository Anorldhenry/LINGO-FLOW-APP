'use client'

import { useState } from 'react'
import { X, Send, MessageCircle, HelpCircle } from 'lucide-react'

export default function CreatePostModal({ isOpen, onClose, targetLang, onPostCreated }: any) {
  const [content, setContent] = useState('')
  const [type, setType] = useState('practice')
  const [isPosting, setIsPosting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!content.trim()) return
    
    setIsPosting(true)
    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, lang: targetLang, type })
      })
      if (res.ok) {
        setContent('')
        onPostCreated()
        onClose()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-surface w-full max-w-lg rounded-[32px] border-2 border-border-color shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b-2 border-border-color flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-foreground">Create Community Post</h3>
          <button onClick={onClose} className="p-2 hover:bg-surface-hover rounded-xl transition-colors">
            <X className="h-6 w-6 text-bold" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex gap-4 mb-6">
             <button 
                type="button"
                onClick={() => setType('practice')}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all 
                ${type === 'practice' ? 'border-[#58CC02] bg-success-bg border-b-4' : 'border-border-color hover:bg-surface-hover border-b-4'}`}
             >
                <MessageCircle className={`h-6 w-6 ${type === 'practice' ? 'text-[#58CC02]' : 'text-bold'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${type === 'practice' ? 'text-[#58CC02]' : 'text-bold'}`}>Practice</span>
             </button>
             <button 
                type="button"
                onClick={() => setType('question')}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all 
                ${type === 'question' ? 'border-[#58CC02] bg-success-bg border-b-4' : 'border-border-color hover:bg-surface-hover border-b-4'}`}
             >
                <HelpCircle className={`h-6 w-6 ${type === 'question' ? 'text-[#58CC02]' : 'text-bold'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${type === 'question' ? 'text-[#58CC02]' : 'text-bold'}`}>Question</span>
             </button>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={type === 'practice' ? "Share a phrase to practice with others..." : "Ask the community a language question..."}
            className="w-full h-40 bg-surface-hover rounded-2xl border-2 border-border-color p-4 font-medium text-foreground focus:outline-none focus:border-[#58CC02]/50 transition-all resize-none mb-6"
            required
          />

          <button
            type="submit"
            disabled={isPosting || !content.trim()}
            className="w-full bg-[#58CC02] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm border-b-[6px] border-[#357B00] active:border-b-0 active:translate-y-1 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {isPosting ? <span className="animate-spin text-xl">⏳</span> : <Send className="h-5 w-5" />}
            Post to {targetLang} Hub
          </button>
        </form>
      </div>
    </div>
  )
}
