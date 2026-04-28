import Link from 'next/link'
import { Sparkles, BookOpen, Flame, Play, Check } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-[#58CC02]/30 overflow-x-hidden">
      
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 bg-surface border-b-2 border-border-color z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/assets/logo-transparent.png" alt="Lingo Flow" className="h-8 w-auto" />
            <span className="text-xl font-extrabold text-[#58CC02] tracking-tight">lingoflow</span>
          </div>
          <nav className="flex items-center gap-4">
            <ThemeToggle />
            <Link 
              href="/auth" 
              className="hidden sm:block text-bold hover:text-foreground font-bold uppercase tracking-wide text-sm transition-colors"
            >
              Log In
            </Link>
            <Link 
              href="/auth" 
              className="uppercase tracking-widest text-sm font-bold bg-[#58CC02] hover:bg-[#46A302] text-white px-6 py-2.5 rounded-xl border-b-4 border-[#357B00] active:border-b-0 active:translate-y-1 transition-all"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-4 pt-20 pb-12 flex flex-col items-center justify-center min-h-[65vh] text-center">
        
        <div className="relative mb-4">
          <img src="/assets/logo-transparent.png" alt="Lingo Flow" className="h-24 sm:h-32 w-auto relative z-10 animate-bounce" style={{ animationDuration: '3s' }} />
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground max-w-2xl mb-6 leading-[1.1] tracking-tight uppercase">
          EASY, FLEXIBLE & FUN LANGUAGE LEARNING
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-md">
          <Link 
            href="/auth"
            className="w-full flex items-center justify-center uppercase tracking-widest text-sm font-bold bg-[#58CC02] hover:bg-[#46A302] text-white px-8 py-4 rounded-2xl border-b-4 border-[#357B00] active:border-b-0 active:translate-y-1 transition-all shadow-sm"
          >
            Get Started
          </Link>
          <Link 
            href="/auth"
            className="w-full flex items-center justify-center uppercase tracking-widest text-sm font-bold bg-surface hover:bg-surface-hover text-[#58CC02] px-8 py-4 rounded-2xl border-2 border-border-color border-b-4 border-b-border-b-color active:border-b-2 active:translate-y-0.5 transition-all"
          >
            I already have an account
          </Link>
        </div>
      </main>

      {/* Features showcase */}
      <section className="py-10 bg-surface border-t-2 border-border-color">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-foreground mb-3 tracking-tight">Why you'll love Lingo Flow</h2>
            <p className="text-sm sm:text-base text-muted max-w-xl mx-auto font-medium">
              We make learning feel like a game. Practice at your own pace with an AI tutor that supports you every step of the way.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-2">
              <div className="h-16 w-16 bg-[#FFC800] rounded-2xl flex items-center justify-center mb-4 border-b-4 border-[#CC9A00] transform -rotate-3">
                <Flame className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-extrabold text-foreground mb-2">Play & Learn</h3>
              <p className="text-sm text-muted leading-relaxed font-medium">
                Keep the streak alive! Earn points and unlock achievements as you master new words.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-2">
              <div className="h-16 w-16 bg-[#58CC02] rounded-2xl flex items-center justify-center mb-4 border-b-4 border-[#357B00] transform rotate-3">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-extrabold text-foreground mb-2">Friendly AI Coach</h3>
              <p className="text-sm text-muted leading-relaxed font-medium">
                Our AI knows your weak spots and gives you bite-sized lessons to help you improve fast.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-2">
              <div className="h-16 w-16 bg-[#CE82FF] rounded-2xl flex items-center justify-center mb-4 border-b-4 border-[#A556D6] transform -rotate-3">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-extrabold text-foreground mb-2">Practice Speaking</h3>
              <p className="text-sm text-muted leading-relaxed font-medium">
                Chat in Arabic, Runyankore, Kiswahili, or Luganda in real-world scenarios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-[#58CC02] text-center border-t-2 border-[#46A302]">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 tracking-tight">
            Start your language journey today.
          </h2>
          <Link 
            href="/auth"
            className="inline-flex items-center justify-center uppercase tracking-widest text-sm font-bold bg-surface text-[#58CC02] px-8 py-4 rounded-2xl border-b-4 border-border-color active:border-b-0 active:translate-y-1 transition-all hover:bg-surface-hover"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}
