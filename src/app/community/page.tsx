'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { MessageSquare, Users, Sparkles, Plus, Search, Filter, Loader2, ArrowLeft, Globe } from 'lucide-react'
import CommunityPost from '@/components/CommunityPost'
import CreatePostModal from '@/components/CreatePostModal'

function CommunityContent() {
  const [posts, setPosts] = useState([])
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [filterType, setFilterType] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  
  const currentLang = searchParams.get('lang') || profile?.target_language || 'Arabic'

  useEffect(() => {
    async function fetchUserData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: prof } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        setProfile(prof)
      }
    }
    fetchUserData()
  }, [])

  const fetchPosts = async () => {
    setIsLoading(true)
    try {
      let url = `/api/community?lang=${currentLang}`
      if (filterType) url += `&type=${filterType}`
      
      const res = await fetch(url)
      const data = await res.json()
      setPosts(data.posts || [])
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(true) 
      // Artificially wait slightly for smooth animation
      setTimeout(() => setIsLoading(false), 500)
    }
  }

  useEffect(() => {
    if (currentLang) fetchPosts()
  }, [currentLang, filterType])

  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-surface border-b-2 border-border-color z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button onClick={() => router.push('/dashboard')} className="p-2 hover:bg-surface-hover rounded-xl transition-colors">
                <ArrowLeft className="h-6 w-6 text-bold" />
             </button>
             <h1 className="text-xl font-black text-foreground tracking-tight">Community Hub</h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-success-bg rounded-xl border border-[#58CC02]/20">
             <Globe className="h-4 w-4 text-[#58CC02]" />
             <span className="text-xs font-black text-[#58CC02] uppercase tracking-widest">{currentLang} Hub</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-24">
        
        {/* Welcome Section */}
        <div className="mb-8 flex items-center justify-between gap-6 bg-gradient-to-br from-[#1CB0F6] to-[#1483C2] p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-700">
              <Users className="h-32 w-32" />
           </div>
           <div className="z-10">
              <h2 className="text-3xl font-black mb-2 italic">Connect & Practice</h2>
              <p className="font-bold opacity-90 max-w-sm leading-relaxed">Join the {currentLang} conversation! Ask questions or share phrases to practice with other learners.</p>
           </div>
           <button 
            onClick={() => setShowModal(true)}
            className="flex-shrink-0 w-16 h-16 bg-white text-[#1CB0F6] rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all group-hover:rotate-12"
           >
              <Plus className="h-8 w-8 stroke-[3]" />
           </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-none">
           <button 
              onClick={() => setFilterType(null)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[11px] border-b-4 transition-all
              ${!filterType ? 'bg-[#58CC02] text-white border-[#357B00]' : 'bg-surface text-bold border-border-color hover:bg-surface-hover'}`}
           >
              All Posts
           </button>
           <button 
              onClick={() => setFilterType('practice')}
              className={`whitespace-nowrap px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[11px] border-b-4 transition-all
              ${filterType === 'practice' ? 'bg-[#CE82FF] text-white border-[#9F56D2]' : 'bg-surface text-bold border-border-color hover:bg-surface-hover'}`}
           >
              Peer Practice
           </button>
           <button 
              onClick={() => setFilterType('question')}
              className={`whitespace-nowrap px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[11px] border-b-4 transition-all
              ${filterType === 'question' ? 'bg-[#FF9600] text-white border-[#D97E00]' : 'bg-surface text-bold border-border-color hover:bg-surface-hover'}`}
           >
              Questions
           </button>
        </div>

        {/* Feed */}
        <div className="space-y-4">
           {isLoading ? (
             <div className="flex flex-col items-center justify-center py-20 opacity-50">
                <Loader2 className="h-10 w-10 text-[#58CC02] animate-spin mb-4" />
                <p className="font-bold text-bold uppercase tracking-widest text-sm text-center">Loading the community...</p>
             </div>
           ) : posts.length > 0 ? (
             posts.map((post: any) => (
               <CommunityPost key={post.id} post={post} />
             ))
           ) : (
             <div className="bg-surface rounded-3xl border-2 border-dashed border-border-color p-20 text-center">
                <div className="bg-surface-hover w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                   <MessageSquare className="h-8 w-8 text-bold opacity-30" />
                </div>
                <h3 className="text-xl font-extrabold text-foreground mb-1 italic">Silent Hub</h3>
                <p className="text-bold font-bold max-w-xs mx-auto mb-6">No {filterType || ''} posts in the {currentLang} community yet.</p>
                <button 
                  onClick={() => setShowModal(true)}
                  className="bg-[#58CC02] text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs border-b-4 border-[#357B00] active:border-b-0 active:translate-y-1 transition-all"
                >
                  Be the First to Post
                </button>
             </div>
           )}
        </div>
      </main>

      <CreatePostModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        targetLang={currentLang}
        onPostCreated={fetchPosts}
      />

    </div>
  )
}

export default function CommunityPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#58CC02]" />
      </div>
    }>
      <CommunityContent />
    </Suspense>
  )
}
