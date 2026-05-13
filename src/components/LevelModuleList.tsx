'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CheckCircle2, WifiOff } from 'lucide-react'

export function LevelModuleList({ modulesList, profile, activeIndex, targetLevel }: any) {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <>
      {modulesList.filter((m: any) => m.level === targetLevel).map((mod: any) => {
        const isFinished = profile.completed_modules.includes(mod.id);
        const serverLocked = modulesList.findIndex((m: any) => m.id === mod.id) > activeIndex && !isFinished;
        
        // Modules in Level 2, 3, and 4 require connection for advanced features usually
        const connectionRequired = targetLevel >= 2;
        const isLocked = serverLocked || (connectionRequired && !isOnline);

        return (
          <div key={mod.id} className="w-full flex flex-col items-center gap-6 relative group">
            <div className="w-full flex items-center gap-4 z-10 my-2">
              <div className="flex-1 h-0.5 bg-border-color/50"></div>
              <div className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest border-b-2
                ${isLocked ? 'bg-border-b-color text-neutral-400 border-border-color' : isFinished ? 'bg-success-bg text-[#46A302] border-[#58CC02]' : 'bg-[#FFC800] text-yellow-900 border-[#CC9A00]'}`}>
                {mod.unit}
              </div>
              <div className="flex-1 h-0.5 bg-border-color/50"></div>
            </div>

            <div className="flex flex-col items-center gap-3 relative w-full group">
              {isLocked ? (
                <div className="w-20 h-20 rounded-full border-b-8 flex items-center justify-center shadow-md relative z-10 grayscale opacity-50 bg-neutral-300 text-muted">
                  <span className="text-3xl">{mod.icon}</span>
                  {!isOnline && connectionRequired && !serverLocked && (
                    <div className="absolute -right-2 top-0 bg-red-400 rounded-full p-1.5 border-4 border-surface shadow-sm" title="Online Required">
                      <WifiOff className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  href={`/lesson?lang=${profile.target_language}&module=${mod.id}`}
                  className={`w-20 h-20 rounded-full border-b-8 flex items-center justify-center transform transition-all cursor-pointer shadow-md relative z-10 hover:-translate-y-1 
                    ${isFinished ? 'animate-pulse-slow ring-4 ring-[#58CC02]/20' : 'ring-4 ring-transparent hover:ring-white/20'}`}
                  style={{ 
                    backgroundColor: isFinished ? '#58CC02' : mod.color, 
                    borderColor: isFinished ? '#46A302' : mod.border 
                  }}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">{mod.icon}</span>
                  {isFinished && (
                    <div className="absolute -right-2 top-0 bg-[#58CC02] rounded-full p-1.5 border-4 border-surface shadow-sm animate-in zoom-in duration-300">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  )}
                </Link>
              )}
              <h3 className={`text-sm flex flex-col items-center font-extrabold uppercase tracking-wide ${isLocked ? 'text-neutral-400' : 'text-foreground'}`}>
                {mod.name}
                {!isOnline && connectionRequired && !serverLocked && (
                    <span className="text-[10px] text-red-500 mt-1">Requires Connection</span>
                )}
              </h3>
            </div>
          </div>
        );
      })}
    </>
  )
}
