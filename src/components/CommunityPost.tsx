'use client'

import { useState } from 'react'
import { MessageSquare, Heart, Share2, MoreHorizontal } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export default function CommunityPost({ post }: { post: any }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes_count || 0)
  const [showReplies, setShowReplies] = useState(false)

  const handleLike = async () => {
    const newLiked = !isLiked
    const newLikes = newLiked ? likes + 1 : likes - 1
    
    // Optimistic Update
    setIsLiked(newLiked)
    setLikes(newLikes)
    
    try {
      await fetch(`/api/community/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post.id, increment: newLiked })
      })
    } catch (err) {
      // Rollback on error
      setIsLiked(!newLiked)
      setLikes(likes)
      console.error("Like failed:", err)
    }
  }

  return (
    <div className="bg-surface rounded-3xl border-2 border-border-color p-6 mb-4 shadow-sm hover:border-[#58CC02]/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#58CC02] rounded-full flex items-center justify-center text-white font-black text-sm shadow-inner">
            {post.profiles?.full_name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h4 className="font-extrabold text-foreground text-sm">{post.profiles?.full_name || 'Learner'}</h4>
            <p className="text-[10px] text-bold font-bold uppercase tracking-widest leading-none">
              {formatDistanceToNow(new Date(post.created_at))} ago • {post.lang}
            </p>
          </div>
        </div>
        <button className="text-bold hover:text-foreground">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-6">
        {post.post_type === 'question' && (
          <span className="inline-block px-3 py-1 bg-info-bg text-[#1CB0F6] text-[10px] font-black uppercase tracking-widest rounded-lg mb-2 border border-[#1CB0F6]/20">
            Question
          </span>
        )}
        {post.post_type === 'practice' && (
          <span className="inline-block px-3 py-1 bg-success-bg text-[#58CC02] text-[10px] font-black uppercase tracking-widest rounded-lg mb-2 border border-[#58CC02]/20">
            Practice
          </span>
        )}
        <p className="text-foreground font-medium leading-relaxed">
          {post.content}
        </p>
      </div>

      <div className="flex items-center gap-6 pt-4 border-t border-border-color/50">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 text-sm font-bold transition-colors ${isLiked ? 'text-[#FF4B4B]' : 'text-bold hover:text-[#FF4B4B]'}`}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          {likes}
        </button>
        <button 
          onClick={() => setShowReplies(!showReplies)}
          className="flex items-center gap-2 text-sm font-bold text-bold hover:text-[#1CB0F6] transition-colors"
        >
          <MessageSquare className="h-5 w-5" />
          Reply
        </button>
        <button className="flex items-center gap-2 text-sm font-bold text-bold hover:text-[#58CC02] transition-colors">
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {showReplies && (
        <div className="mt-6 pt-6 border-t border-border-color/50 animate-in fade-in slide-in-from-top-2 duration-300">
          <ReplySection postId={post.id} />
        </div>
      )}
    </div>
  )
}

function ReplySection({ postId }: { postId: string }) {
  const [replies, setReplies] = useState([])
  const [replyText, setReplyText] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchReplies = async () => {
    try {
      const res = await fetch(`/api/community/replies?postId=${postId}`)
      const data = await res.json()
      setReplies(data.replies || [])
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReplies()
  }, [postId])

  const handleReply = async () => {
    if (!replyText.trim()) return
    
    const newReply = {
      id: Math.random().toString(), // Temp ID
      content: replyText,
      created_at: new Date().toISOString(),
      profiles: { full_name: 'You' }, // Placeholder
      isOptimistic: true
    }

    // Optimistic Update
    setReplies((prev: any) => [newReply, ...prev])
    setReplyText('')

    try {
      const res = await fetch('/api/community/replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, content: replyText })
      })
      if (!res.ok) throw new Error("Failed to post")
      
      // Refresh to get the real ID and data
      fetchReplies()
    } catch (err) {
      // Rollback
      setReplies((prev: any) => prev.filter((r: any) => r.id !== newReply.id))
      setReplyText(newReply.content)
      console.error(err)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3 mb-6">
        <div className="bg-surface-hover rounded-2xl px-4 border-2 border-border-color flex-1 flex items-center">
          <input 
            type="text" 
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a peer correction or practice reply..." 
            className="bg-transparent border-none outline-none w-full text-sm font-bold py-3 text-foreground"
            onKeyDown={(e) => e.key === 'Enter' && handleReply()}
          />
        </div>
        <button 
          onClick={handleReply}
          disabled={isPosting || !replyText.trim()}
          className="bg-[#58CC02] text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border-b-4 border-[#357B00] active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50"
        >
          Post
        </button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
           <div className="text-center py-4 text-xs font-bold text-bold animate-pulse">Loading conversation...</div>
        ) : replies.map((reply: any) => (
          <div key={reply.id} className="flex gap-3 pl-4 border-l-2 border-[#58CC02]/20 py-1">
             <div className="w-8 h-8 bg-surface-hover rounded-full flex items-center justify-center text-bold font-black text-xs border border-border-color">
                {reply.profiles?.full_name?.charAt(0).toUpperCase()}
             </div>
             <div>
                <div className="flex items-center gap-2 mb-0.5">
                   <h5 className="font-extrabold text-xs text-foreground">{reply.profiles?.full_name}</h5>
                   <span className="text-[9px] text-bold font-bold uppercase">{formatDistanceToNow(new Date(reply.created_at))} ago</span>
                </div>
                <p className="text-sm text-foreground font-medium">{reply.content}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  )
}
