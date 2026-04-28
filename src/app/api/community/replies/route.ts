import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const postId = searchParams.get('postId')

    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
    }

    const { data: replies, error } = await supabase
      .from('community_replies')
      .select(`
        *,
        profiles:user_id (full_name)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    if (error) throw error

    return NextResponse.json({ replies })
  } catch (error) {
    console.error('Replies Fetch Error:', error)
    return NextResponse.json({ error: 'Failed to fetch replies' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { postId, content } = await req.json()

    if (!postId || !content) {
      return NextResponse.json({ error: 'Post ID and content are required' }, { status: 400 })
    }

    const { data: reply, error } = await supabase
      .from('community_replies')
      .insert([
        { 
          user_id: user.id, 
          post_id: postId, 
          content 
        }
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Reply Creation Error:', error)
    return NextResponse.json({ error: 'Failed to create reply' }, { status: 500 })
  }
}
