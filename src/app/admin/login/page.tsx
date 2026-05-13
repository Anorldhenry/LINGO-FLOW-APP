'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldAlert, Loader2, Lock, User, ArrowLeft, Eye, EyeOff } from 'lucide-react'
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
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const cleanedUsername = username.trim().toLowerCase()
    const internalEmail = cleanedUsername.includes('@') ? cleanedUsername : `${cleanedUsername}@lingoflow.ai`

    try {
      // MANDATORY: Clear any stale sessions/cookies before attempting a new login
      await supabase.auth.signOut();
      localStorage.clear();
      sessionStorage.clear();
      // 1. Primary Authentication Attempt
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: internalEmail,
        password: password,
      })

      // 2. Success Path
      if (!signInError && signInData.user) {
        // Enforce Admin Rights Check
        const isSuperAdmin = signInData.user.email === 'superadmin@lingoflow.ai' || signInData.user.user_metadata?.isAdmin
        
        if (!isSuperAdmin) {
          await supabase.auth.signOut()
          setError('Access denied. This account does not have administrative privileges.')
          setIsLoading(false)
          return
        }

        // Auto-provision profile details if missing (ensures they bypass setup screens)
        await supabase.from('profiles').upsert({ 
          id: signInData.user.id, 
          target_language: 'Arabic',
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' })

        router.push('/admin')
        return
      }

      // 3. Conditional Error / Bootstrap Path
      if (signInError) {
        console.error("DEBUG - Admin Login Failure:", {
          emailAttempted: internalEmail,
          errorCode: signInError.status,
          errorMessage: signInError.message
        });

        if (signInError.message.includes('Email not confirmed')) {
          setError('CRITICAL: Email check required. Please go to your Supabase Dashboard > Authentication > Users, and click "Confirm Email" for superadmin@lingoflow.ai.');
          setIsLoading(false);
          return;
        }

        const isDefaultCreds = (cleanedUsername === ADMIN_USERNAME || cleanedUsername === `${ADMIN_USERNAME}@lingoflow.ai`) && password.trim() === ADMIN_PASSWORD;

        if (isDefaultCreds) {
          console.log("SUCCESS: Default Admin Credentials detected. Proceeding to bootstrap/sync...");
          // Attempt one-time bootstrap
          console.log("Admin account missing? Attempting system bootstrap...")
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: internalEmail,
            password: ADMIN_PASSWORD,
            options: { data: { full_name: 'Admin', isAdmin: true } }
          })

          if (signUpError) {
            // Check if user already exists (meaning they just entered the WRONG password for an existing account)
            if (signUpError.message.includes('already registered')) {
              setError('Incorrect password. If you changed your admin password in Settings, please use that one. Otherwise, reset it via the Supabase SQL editor.');
            } else {
              setError(`Setup Error: ${signUpError.message}`);
            }
          } else if (signUpData.user) {
            // New user created! Log them in.
            await supabase.auth.signInWithPassword({ email: internalEmail, password: ADMIN_PASSWORD })
            router.push('/admin')
            return
          }
        } else {
          // Generic login failure - Reveal more detail if it's not a standard mismatch
          setError(signInError.message === 'Invalid login credentials' 
            ? 'Invalid username or password. Please try again.' 
            : `Login Error: ${signInError.message} (Code: ${signInError.status})`);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please refresh and try again.')
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
            <img src="/assets/logo-transparent.png" className="w-full h-full object-contain" alt="Lingo Flow" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Admin Panel</h1>
          <p className="text-muted font-bold text-sm">Lingo Flow Platform Management</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface backdrop-blur-xl rounded-[48px] p-8 border border-border-color shadow-2xl">
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
                  onChange={(e) => {
                    setUsername(e.target.value)
                    if (error) setError(null)
                  }}
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
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (error) setError(null)
                  }}
                  className="w-full bg-surface-hover text-foreground border-2 border-border-color rounded-2xl pl-12 pr-12 py-3.5 font-medium focus:border-[#58CC02] focus:bg-surface focus:outline-none transition-all placeholder:text-muted"
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
