import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const lang = searchParams.get('lang')
    const type = searchParams.get('type')

    let queryBuilder = supabase
      .from('community_posts')
      .select(`
        *,
        profiles:user_id (full_name)
      `)
      .order('created_at', { ascending: false })
      .limit(50)

    if (lang) {
      queryBuilder = queryBuilder.eq('lang', lang)
    }
    
    if (type) {
      queryBuilder = queryBuilder.eq('post_type', type)
    }

    const { data: posts, error } = await Promise.race([
      queryBuilder,
      new Promise((_, reject) => setTimeout(() => reject(new Error('Community Fetch Timeout')), 8000))
    ]) as any

    if (error) throw error

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Community Fetch Error:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { content, lang, type } = await req.json()

    if (!content || !lang) {
      return NextResponse.json({ error: 'Content and language are required' }, { status: 400 })
    }

    const { data: post, error } = await supabase
      .from('community_posts')
      .insert([
        { 
          user_id: user.id, 
          content, 
          lang, 
          post_type: type || 'practice' 
        }
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Community Post Error:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
