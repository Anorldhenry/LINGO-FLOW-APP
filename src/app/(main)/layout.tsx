import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navigation } from '@/components/Navigation'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user && process.env.NODE_ENV === 'production') {
    redirect('/auth')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .maybeSingle()

  return (
    <div className="min-h-screen">
      <Navigation profile={profile} />
      <div className="pt-16 md:pb-0 pb-20">
        {children}
      </div>
    </div>
  )
}
