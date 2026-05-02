'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  MessageSquare, 
  Users, 
  Trophy, 
  Settings, 
  Bot,
  Sparkles,
  Flame
} from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

export function Navigation({ profile }: { profile: any }) {
  const pathname = usePathname()

  const navItems = [
    { name: 'Learn', href: '/dashboard', icon: Home },
    { name: 'Tutor', href: `/tutor?lang=${profile?.target_language}`, icon: Bot },
    { name: 'Community', href: `/community?lang=${profile?.target_language}`, icon: Users },
  ]

  return (
    <>
      {/* Top Navbar - Desktop */}
      <header className="fixed top-0 left-0 right-0 bg-surface border-b-2 border-border-color z-50 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <img src="/assets/logo-transparent.png" alt="Lingo Flow" className="h-10 w-auto group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-extrabold text-[#58CC02] tracking-tight hidden sm:block">lingoflow</span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href.split('?')[0]
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                    isActive 
                      ? 'text-[#58CC02] bg-success-bg border-b-2 border-[#58CC02]' 
                      : 'text-bold hover:bg-surface-hover hover:text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-4 border-l-2 border-border-color pl-6">
             <div className="hidden sm:flex items-center gap-4 mr-2">
                <div className="flex items-center gap-1.5 text-[#FF9600] font-bold text-sm">
                  <Flame className="h-4 w-4 fill-current" />
                  <span>{profile?.streak || 0}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#58CC02] font-bold text-sm">
                  <Trophy className="h-4 w-4 fill-current" />
                  <span>{profile?.xp || 0}</span>
                </div>
             </div>
             <ThemeToggle />
             {profile?.subscription_tier === 'pro' && (
                <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl text-[10px] font-black text-white border-2 border-yellow-300 shadow-sm">
                  <Sparkles className="h-3 w-3" /> PRO
                </div>
             )}
             <div className="bg-[#58CC02] h-8 w-8 rounded-full flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-surface cursor-pointer hover:scale-105 transition-transform">
                {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
             </div>
          </div>
        </div>
      </header>

      {/* Bottom Nav - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t-2 border-border-color z-50 md:hidden flex items-center justify-around px-4 py-3 pb-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href.split('?')[0]
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? 'text-[#58CC02] scale-110' : 'text-bold hover:text-foreground'
              }`}
            >
              <Icon className={`h-6 w-6 ${isActive ? 'fill-current' : ''}`} />
              <span className="text-[10px] font-black uppercase tracking-widest">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
