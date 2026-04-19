'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldAlert, Loader2, Lock, User, ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { ThemeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'

const ADMIN_USERNAME = 'superadmin'
const ADMIN_PASSWORD = 'Admin@2026!'

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const internalEmail = `${username.trim().toLowerCase()}@lingoflow.ai`

    try {
      // Normal sign in attempt
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: internalEmail,
        password: password,
      })

      // If sign in fails, and they are typing the fallback bootstrap credentials, auto-create it
      if (signInError) {
        if (username.trim().toLowerCase() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          const { error: signUpError } = await supabase.auth.signUp({
            email: internalEmail,
            password: ADMIN_PASSWORD,
            options: { data: { full_name: 'Admin', isAdmin: true } }
          })
          if (signUpError) { 
            // If the user already exists, the real error was the signInError (invalid password)
            if (signUpError.message.includes('already registered') || signUpError.message.includes('already exists')) {
              setError('Invalid login credentials. Have you previously changed the admin password?');
            } else {
              setError(signUpError.message); 
            }
            setIsLoading(false); 
            return 
          }
          
          await supabase.auth.signInWithPassword({ email: internalEmail, password: ADMIN_PASSWORD })
        } else {
          setError('Invalid admin username or password.')
          setIsLoading(false)
          return
        }
      } else if (signInData.user) {
        // If they successfully signed in, verify they are actually an admin!
        const isActuallyAdmin = signInData.user.user_metadata?.isAdmin || signInData.user.email === 'superadmin@lingoflow.ai'
        
        if (!isActuallyAdmin) {
          await supabase.auth.signOut()
          setError('Access denied. Account does not have admin privileges.')
          setIsLoading(false)
          return
        }
      }

      // Update the admin profile with a target_language so it doesn't redirect to /setup
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('profiles').update({ target_language: 'Arabic' }).eq('id', user.id)
      }

      router.push('/admin')
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Animated background elements */}
      {/* Top Header */}
      <header className="h-16 flex items-center justify-between px-6 absolute top-0 w-full z-50">
        <Link href="/" className="text-bold hover:text-foreground transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <ThemeToggle />
      </header>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#58CC02]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#58CC02]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#58CC02]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-6 relative">
            <img src="/assets/logo-transparent.png" className="w-full h-full object-contain drop-shadow-2xl" alt="Lingo Flow" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Admin Panel</h1>
          <p className="text-muted font-bold text-sm">Lingo Flow Platform Management</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface backdrop-blur-xl rounded-[32px] p-8 border border-border-color shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-[11px] font-black text-bold uppercase tracking-widest mb-2">Admin Username</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-bold">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-surface-hover text-foreground border-2 border-border-color rounded-2xl pl-12 pr-4 py-3.5 font-medium focus:border-[#58CC02] focus:bg-surface focus:outline-none transition-all placeholder:text-muted"
                  placeholder="Enter admin username"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-bold uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-bold">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-hover text-foreground border-2 border-border-color rounded-2xl pl-12 pr-4 py-3.5 font-medium focus:border-[#58CC02] focus:bg-surface focus:outline-none transition-all placeholder:text-muted"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-error-bg text-[#EA2B2B] p-4 rounded-xl text-sm font-bold border border-error-bg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-4 uppercase tracking-widest text-sm font-bold bg-gradient-to-r from-[#58CC02] to-[#46A302] hover:from-[#D898FF] hover:to-[#B06AE8] text-white rounded-2xl border-b-4 border-[#357B00] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <img src="/assets/logo-transparent.png" className="w-5 h-5 object-contain" alt="Logo" /> Access Dashboard
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}
