import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request) {
  const supabase = await createClient()

  // Verify Admin Status
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || (!user.user_metadata?.isAdmin && user.email !== 'superadmin@lingoflow.ai')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { userId, tier } = await request.json()

    if (!userId || !tier) {
      return NextResponse.json({ error: 'User ID and Tier are required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('profiles')
      .update({ subscription_tier: tier })
      .eq('id', userId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
