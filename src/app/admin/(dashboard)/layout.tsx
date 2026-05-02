import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Users, LogOut, ShieldAlert, MessageSquare } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Strict Admin Guard — check metadata or fallback to default email
  if (!user || (!user.user_metadata?.isAdmin && user.email !== 'superadmin@lingoflow.ai')) {
    redirect('/admin/login')
  }

  // Auto-upgrade the default account to have isAdmin metadata if missing
  if (user && !user.user_metadata?.isAdmin && user.email === 'superadmin@lingoflow.ai') {
     await supabase.auth.updateUser({ data: { isAdmin: true } })
  }

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-surface border-b-2 md:border-b-0 md:border-r-2 border-border-color flex flex-col md:min-h-screen sticky top-0 z-40">
        <div className="p-4 md:p-6 border-b-2 border-border-color flex items-center justify-between gap-3">
          <img src="/assets/logo-transparent.png" alt="Lingo Flow" className="h-8 w-auto" />
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">Admin</h1>
            <p className="text-[10px] font-bold text-bold uppercase tracking-widest">Lingo Flow</p>
          </div>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <nav className="p-4 md:p-6 flex flex-row md:flex-col gap-2 md:gap-4 overflow-x-auto flex-none md:flex-1 w-full hide-scrollbar border-b-2 md:border-b-0 border-border-color">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-border-color hover:border-[#58CC02] hover:bg-success-bg transition-all font-bold text-foreground group shadow-sm bg-surface"
          >
            <LayoutDashboard className="h-5 w-5 text-bold group-hover:text-[#58CC02]" />
            Overview
          </Link>
          <Link 
            href="/admin/users" 
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-border-color hover:border-[#58CC02] hover:bg-success-bg transition-all font-bold text-foreground group shadow-sm bg-surface"
          >
            <Users className="h-5 w-5 text-bold group-hover:text-[#58CC02]" />
            Users
          </Link>
          <Link 
            href="/admin/settings" 
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-border-color hover:border-[#58CC02] hover:bg-success-bg transition-all font-bold text-foreground group shadow-sm bg-surface"
          >
            <ShieldAlert className="h-5 w-5 text-bold group-hover:text-[#58CC02]" />
            Settings
          </Link>
          <Link 
            href="/admin/community" 
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-border-color hover:border-[#58CC02] hover:bg-success-bg transition-all font-bold text-foreground group shadow-sm bg-surface"
          >
            <MessageSquare className="h-5 w-5 text-bold group-hover:text-[#58CC02]" />
            Community
          </Link>
        </nav>

        <div className="mt-auto p-6 md:border-t-2 border-border-color hidden md:block">
          <form action="/auth/signout" method="post">
            <button className="w-full uppercase tracking-widest text-xs font-bold text-bold hover:text-[#EA2B2B] transition-colors flex items-center justify-center gap-2 p-3 bg-surface-hover rounded-xl hover:bg-error-bg">
              <LogOut className="h-4 w-4" /> Exit Admin
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
