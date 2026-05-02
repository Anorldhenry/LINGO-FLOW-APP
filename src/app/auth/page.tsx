'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, LogIn, UserPlus, Loader2, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AuthPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [isLogin, setIsLogin] = useState(true)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    
    // We treat username as a unique identifier by appending a mock domain for Supabase
    const internalEmail = `${username.toLowerCase().trim()}@lingoflow.ai`
    
    try {
      if (isLogin) {
        const { error, data } = await supabase.auth.signInWithPassword({
          email: internalEmail,
          password
        })
        if (error) throw error
        
        // Ensure session is recognized before redirecting
        if (data.session) {
           console.log("Login successful, preparing dashboard...")
           // Using window.location.href for a clean, forced refresh to avoid Next.js middleware desync
           window.location.href = '/dashboard'
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: internalEmail,
          password,
          options: {
            data: {
              full_name: username
            }
          }
        })
        if (error) throw error
        
        if (data.user) {
           console.log("Signup successful, entering dashboard...")
           window.location.href = '/dashboard'
        }
      }
    } catch (err: any) {
      setError(err.message === 'Invalid login credentials' 
        ? 'Invalid username or password.' 
        : err.message || 'An error occurred during authentication')
    } finally {
      // We don't necessarily clear loading if we are redirecting
      // but we do it if there was an error
      if (error) setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="h-16 flex items-center px-6">
        <Link href="/" className="text-bold hover:text-foreground transition-colors flex items-center gap-2">
          <ArrowLeft className="h-6 w-6" />
          <img src="/assets/logo-transparent.png" alt="Logo" className="h-6 w-auto" />
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-surface rounded-[48px] p-8 shadow-sm border-2 border-border-color">
          
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4 transition-transform hover:scale-110">
               <img src="/assets/logo-transparent.png" className="w-full h-full object-contain" alt="Lingo Flow" />
            </div>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="text-bold font-bold">
              {isLogin ? 'Sign in with your username' : 'Pick a username and password'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-bold uppercase tracking-wide mb-2">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-surface-hover text-foreground border-2 border-border-color rounded-2xl px-4 py-3 font-medium focus:border-[#58CC02] focus:bg-surface focus:outline-none transition-colors"
                placeholder={isLogin ? "Your username" : "e.g. polyglot123"}
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-bold uppercase tracking-wide mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-hover text-foreground border-2 border-border-color rounded-2xl pl-4 pr-12 py-3 font-medium focus:border-[#58CC02] focus:bg-surface focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-bold hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-error-bg text-[#EA2B2B] p-3 rounded-xl text-sm font-bold border border-error-bg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-4 uppercase tracking-widest text-[15px] font-bold bg-[#58CC02] hover:bg-[#46A302] text-white rounded-2xl border-b-4 border-[#46A302] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isLogin ? (
                <><LogIn className="w-5 h-5" /> Sign In</>
              ) : (
                <><UserPlus className="w-5 h-5" /> Create Account</>
              )}
            </button>
            
            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#58CC02] font-bold hover:text-[#46A302] transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </div>
      </main>
      
    </div>
  )
}
