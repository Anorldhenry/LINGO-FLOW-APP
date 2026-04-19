import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    'https://xkszgpmnzhbltjyrotbj.supabase.co',
    'sb_publishable_gQ01GGeb4-batGTkTeEtOA_9kp8447J'
  )
}
