import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { postId, increment } = await req.json()

    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
    }

    // Update the likes_count in community_posts
    const { data, error } = await supabase.rpc(
      increment ? 'increment_likes' : 'decrement_likes',
      { post_id: postId }
    )

    if (error) {
      // If RPC fails (e.g., function doesn't exist), fallback to standard update
      const { data: post } = await supabase
        .from('community_posts')
        .select('likes_count')
        .eq('id', postId)
        .single()
      
      const currentLikes = post?.likes_count || 0
      const { error: updateError } = await supabase
        .from('community_posts')
        .update({ likes_count: increment ? currentLikes + 1 : Math.max(0, currentLikes - 1) })
        .eq('id', postId)

      if (updateError) throw updateError
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Like Toggle Error:', error)
    return NextResponse.json({ error: 'Failed to toggle like' }, { status: 500 })
  }
}
