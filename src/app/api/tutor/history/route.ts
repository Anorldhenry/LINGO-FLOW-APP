import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const lang = searchParams.get('lang')

    if (!lang) {
      return NextResponse.json({ error: 'Language parameter is required' }, { status: 400 })
    }

    // Fetch conversation history sorted by creation time
    const { data: messages, error } = await supabase
      .from('tutor_messages')
      .select('id, role, content, tip, created_at')
      .eq('user_id', user.id)
      .eq('lang', lang)
      .order('created_at', { ascending: true })
      .limit(50) // Adjust limit as needed

    if (error) {
      console.error('Error fetching chat history:', error)
      return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 })
    }

    return NextResponse.json({ messages: messages || [] })

  } catch (error) {
    console.error('Unexpected error fetching chat history:', error)
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 })
  }
}
