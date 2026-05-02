'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Save, Loader2, ShieldCheck, KeyRound, Eye, EyeOff } from 'lucide-react'

export default function AdminSettingsPage() {
  const supabase = createClient()
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' })
      return
    }

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters long.' })
      return
    }

    setIsLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.email) {
        throw new Error('Could not identify current admin user.')
      }

      // Verify the current password by attempting to sign in
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword
      })

      if (verifyError) {
        setMessage({ type: 'error', text: 'Incorrect current password.' })
        setIsLoading(false)
        return
      }

      // If successful, proceed to update the password
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        setMessage({ type: 'success', text: 'Admin password successfully updated! You can use the new password next time you log in.' })
        setCurrentPassword('')
        setPassword('')
        setConfirmPassword('')
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: 'An unexpected error occurred.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-2xl">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Security Settings</h2>
        <p className="text-bold font-bold">Manage your admin login credentials.</p>
      </div>

      <div className="bg-surface rounded-[32px] border-2 border-border-color overflow-hidden shadow-sm p-8">
        
        <div className="flex items-center gap-4 mb-8 pb-8 border-b-2 border-border-color">
          <div className="w-16 h-16 bg-info-bg rounded-2xl flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 text-[#58CC02]" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-foreground">Admin Identity</h3>
            <p className="text-sm font-bold text-muted">Your account is granted superuser access via secure metadata.</p>
          </div>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <h4 className="font-extrabold text-foreground flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-bold" /> Change Password
          </h4>
          
          <div className="space-y-4">
            <div className="pb-4 border-b-2 border-[#F7F7F7]">
              <label className="block text-[11px] font-black text-bold uppercase tracking-widest mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-surface-hover text-foreground border-2 border-border-color rounded-xl pl-4 pr-12 py-3 font-medium focus:border-[#58CC02] focus:bg-surface focus:outline-none transition-colors"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-bold hover:text-foreground transition-colors"
                >
                  {showCurrent ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-bold uppercase tracking-widest mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-hover text-foreground border-2 border-border-color rounded-xl pl-4 pr-12 py-3 font-medium focus:border-[#58CC02] focus:bg-surface focus:outline-none transition-colors"
                  placeholder="Enter new strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-bold hover:text-foreground transition-colors"
                >
                  {showNew ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-bold uppercase tracking-widest mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-surface-hover text-foreground border-2 border-border-color rounded-xl pl-4 pr-12 py-3 font-medium focus:border-[#58CC02] focus:bg-surface focus:outline-none transition-colors"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-bold hover:text-foreground transition-colors"
                >
                  {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-xl text-sm font-bold border-2 ${
              message.type === 'success' 
                ? 'bg-success-bg text-[#46A302] border-[#58CC02]/20' 
                : 'bg-error-bg text-[#EA2B2B] border-[#EA2B2B]/20'
            }`}>
              {message.text}
            </div>
          )}

          <div className="pt-4 flex justify-end">
             <button
                type="submit"
                disabled={isLoading}
                className="min-w-[200px] uppercase tracking-widest text-sm font-bold bg-[#58CC02] hover:bg-[#46A302] text-white px-8 py-4 rounded-xl border-b-4 border-[#357B00] active:border-b-0 active:translate-y-1 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
             >
               {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Update Password</>}
             </button>
          </div>
        </form>

      </div>
    </div>
  )
}
