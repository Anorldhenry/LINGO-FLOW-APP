import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
  const supabase = await createClient()

  // Verify Admin Status
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || (!user.user_metadata?.isAdmin && user.email !== 'superadmin@lingoflow.ai')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('id')

    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('community_posts')
      .delete()
      .eq('id', postId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
