'use client'

import { useState } from 'react'
import { DatabaseZap, Loader2 } from 'lucide-react'

export function SyncButton() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({ type: 'idle', message: '' })

  const handleSync = async () => {
    setIsSyncing(true)
    setSyncStatus({ type: 'idle', message: '' })
    
    try {
      const res = await fetch('/api/admin/migrate-lessons', { method: 'POST' })
      const data = await res.json()
      
      if (res.ok) {
        setSyncStatus({ type: 'success', message: 'Lessons successfully synchronized!' })
      } else {
        setSyncStatus({ type: 'error', message: data.error || 'Failed to sync lessons.' })
      }
    } catch (err: any) {
      setSyncStatus({ type: 'error', message: 'An unexpected error occurred.' })
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="bg-surface rounded-[32px] border-2 border-border-color p-8 mt-8 shadow-sm">
      <div className="flex items-start justify-between gap-6 mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-foreground mb-2 flex items-center gap-2">
            <DatabaseZap className="h-6 w-6 text-[#1CB0F6]" /> System Actions
          </h3>
          <p className="text-sm font-bold text-muted">Execute manual triggers and core system re-synchronizations.</p>
        </div>
      </div>
      
      <div className="p-6 rounded-2xl border-2 border-border-color bg-surface-hover flex flex-col md:flex-row items-center justify-between gap-6">
         <div>
            <h4 className="font-extrabold text-foreground mb-1">Synchronize Curriculum Content</h4>
            <p className="text-sm text-bold max-w-sm">Pulls static lesson definitions and mirrors them into the live database. Run this when new languages or modules are added to the codebase.</p>
            {syncStatus.type !== 'idle' && (
              <p className={`text-xs font-black uppercase tracking-widest mt-2 ${syncStatus.type === 'success' ? 'text-[#58CC02]' : 'text-[#EA2B2B]'}`}>
                {syncStatus.message}
              </p>
            )}
         </div>
         <button
           onClick={handleSync}
           disabled={isSyncing}
           className="w-full md:w-auto min-w-[200px] bg-[#1CB0F6] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs border-b-[4px] border-[#1483C2] active:border-b-0 active:translate-y-1 transition-all shadow-sm flex justify-center items-center gap-2 disabled:opacity-50"
         >
           {isSyncing ? <Loader2 className="w-5 h-5 animate-spin" /> : <DatabaseZap className="w-5 h-5" />}
           Sync Database
         </button>
      </div>
    </div>
  )
}
