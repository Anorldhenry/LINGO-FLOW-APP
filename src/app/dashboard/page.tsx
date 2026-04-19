import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Flame, Trophy, Shield, Settings, CheckCircle2 } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()

  let user = null
  let profile = {
    full_name: 'Learner',
    xp: 0,
    streak: 0,
    target_language: null as string | null,
    last_lesson_lang: null as string | null,
    last_lesson_module: null as string | null,
    last_lesson_index: 0,
    completed_modules: [] as string[]
  }

  try {
    const { data: { user: authUser } } = await supabase.auth.getUser()
    user = authUser
    
    // Fetch profile details
    if (user) {
      const { data: dbProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        
      if (dbProfile) {
        profile = {
           full_name: dbProfile.full_name || 'Learner',
           xp: dbProfile.xp || 0,
           streak: dbProfile.streak || 0,
           target_language: dbProfile.target_language,
           last_lesson_lang: dbProfile.last_lesson_lang,
           last_lesson_module: dbProfile.last_lesson_module,
           last_lesson_index: dbProfile.last_lesson_index || 0,
           completed_modules: dbProfile.completed_modules || []
        }
      }
    }
  } catch (e) {
    // Graceful fallback
  }

  // Route Protection for authenticated users
  if (!user && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    redirect('/auth')
  }

  // Force onboarding if language isn't picked
  if (user && !profile.target_language) {
    redirect('/setup')
  }

  const modulesList = [
    { id: 'greetings', unit: 'Unit 1: Greetings', name: 'Greetings', icon: '🗣', color: '#58CC02', border: '#357B00' },
    { id: 'time', unit: 'Unit 2: Time and Days', name: 'Time & Days', icon: '⏰', color: '#58CC02', border: '#46A302' },
    { id: 'actions', unit: 'Unit 3: Actions', name: 'Actions', icon: '🏃', color: '#CE82FF', border: '#9F56D2' },
    { id: 'questions', unit: 'Unit 4: Questions', name: 'Questions', icon: '❓', color: '#FF9600', border: '#D97E00' },
    { id: 'conversations', unit: 'Unit 5: Market chat', name: 'Market Chat', icon: '💬', color: '#FF4B4B', border: '#D33131' },
    { id: 'advanced', unit: 'Unit 6: Advanced', name: 'Advanced', icon: '🚀', color: '#58CC02', border: '#357B00' },
  ];

  const firstUncompletedIndex = modulesList.findIndex(mod => !profile.completed_modules.includes(mod.id));
  const activeIndex = firstUncompletedIndex === -1 ? modulesList.length - 1 : firstUncompletedIndex;
  const activeModuleId = modulesList[activeIndex].id;

  return (
    <div className="min-h-screen bg-background font-sans">
      
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 bg-surface border-b-2 border-border-color z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 text-foreground">
            <img src="/assets/logo-transparent.png" alt="Lingo Flow" className="h-10 w-auto drop-shadow-sm" />
            <Link href="/" className="text-2xl font-extrabold text-[#58CC02] tracking-tight">lingoflow</Link>
          </div>
          <div className="flex items-center gap-6">
            
            {/* Quick Course Switcher in Navbar */}
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-surface-hover rounded-2xl border-2 border-border-color group transition-all hover:border-[#58CC02]/30">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-bold uppercase tracking-widest leading-none mb-1">Learning</span>
                <span className="text-sm font-extrabold text-foreground leading-none">{profile.target_language}</span>
              </div>
              <Link 
                href="/setup?source=navbar" 
                className="ml-2 text-[10px] font-black uppercase tracking-widest text-[#58CC02] bg-surface px-2 py-1 rounded-lg border border-[#58CC02]/20 hover:bg-[#58CC02] hover:text-white transition-all shadow-sm"
              >
                Change
              </Link>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-2 text-[#FF9600] font-bold">
                <Flame className="h-5 w-5 fill-current" />
                <span>{profile.streak}</span>
              </div>
              <div className="flex items-center gap-2 text-[#58CC02] font-bold">
                <Trophy className="h-5 w-5 fill-current" />
                <span>{profile.xp} XP</span>
              </div>
            </div>

            <div className="flex items-center gap-4 border-l-2 border-border-color pl-6">
              <ThemeToggle />
              <div className="bg-[#CE82FF] h-8 w-8 rounded-full flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-surface">
                {profile.full_name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="max-w-5xl mx-auto px-6 pt-24 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Learning Path */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Resume Progress Card */}
          {profile.last_lesson_lang && (
            <div className="bg-surface p-6 rounded-3xl border-2 border-[#58CC02] shadow-md flex items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
               <div className="flex items-center gap-4">
                  <div className="bg-info-bg p-3 rounded-2xl">
                     <Trophy className="h-8 w-8 text-[#58CC02]" />
                  </div>
                  <div>
                     <h3 className="font-extrabold text-foreground">Pick up where you left off!</h3>
                     <p className="text-sm text-bold font-medium">Continuing: {profile.last_lesson_module || 'General'} in {profile.last_lesson_lang}</p>
                  </div>
               </div>
               <Link 
                href={`/lesson?lang=${profile.last_lesson_lang}${profile.last_lesson_module ? `&module=${profile.last_lesson_module}` : ''}&resume=true`}
                className="whitespace-nowrap uppercase tracking-widest text-xs font-bold bg-[#58CC02] text-white hover:bg-[#357B00] px-6 py-3 rounded-xl border-b-4 border-[#357B00] active:border-b-0 active:translate-y-1 transition-all"
               >
                 Resume
               </Link>
            </div>
          )}

          <div className="bg-[#58CC02] p-8 rounded-3xl border-b-[6px] border-[#46A302] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm overflow-hidden relative">
            <div className="flex flex-col md:flex-row items-center gap-6 z-10">
              {/* Lingo Baby Mascot Welcome - Polished */}
              <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0 animate-float">
                <img 
                  src="/assets/mascot_idle.png" 
                  alt="Lingo Baby Welcome"
                  className="w-full h-auto object-contain drop-shadow-lg mix-blend-multiply"
                />
              </div>
              
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-xl text-sm font-bold mb-3 border-2 border-white/20">
                  <CheckCircle2 className="h-4 w-4" /> Learning {profile.target_language}
                </div>
                <h2 className="text-2xl font-extrabold mb-1">Welcome, {profile.full_name}!</h2>
                <p className="font-medium opacity-90">Ready to crush your daily goals?</p>
              </div>
            </div>
            <Link href={`/lesson?lang=${profile.target_language || 'Arabic'}&module=${activeModuleId}`} className="whitespace-nowrap uppercase tracking-widest text-sm font-bold bg-surface text-[#58CC02] hover:bg-surface-hover px-8 py-4 rounded-2xl border-b-4 border-border-color active:border-b-0 active:translate-y-1 transition-all shadow-sm z-10">
              Continue: {modulesList[activeIndex].name}
            </Link>
          </div>

          {/* Master Celebration Banner */}
          {profile.completed_modules.length >= modulesList.length && (
            <div className="bg-gradient-to-r from-[#FFC800] to-[#FF9600] p-6 rounded-3xl border-b-[6px] border-[#CC9A00] text-white flex items-center justify-between gap-6 shadow-lg animate-bounce-subtle">
               <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                    <Trophy className="h-8 w-8 text-white fill-current" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl italic uppercase tracking-tighter">Course Champion!</h3>
                    <p className="text-sm font-bold opacity-90">You have mastered every unit in {profile.target_language}!</p>
                  </div>
               </div>
               <div className="text-4xl">🏆</div>
            </div>
          )}

          <div className="bg-surface rounded-3xl border-2 border-border-color p-8 flex flex-col items-center gap-12 relative overflow-hidden">
             {/* Progress Journey Track */}
             <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-border-color/50 -z-0"></div>
             
             {/* Modules Path */}
            {modulesList.map((mod, idx) => {
              const isFinished = profile.completed_modules.includes(mod.id);
              const isLocked = idx > activeIndex && !isFinished;

                return (
                  <div key={mod.id} className="w-full flex flex-col items-center gap-6 relative group">
                    {/* Unit Header separating modules */}
                    <div className="w-full flex items-center gap-4 z-10 my-4">
                      <div className="flex-1 h-0.5 bg-border-color"></div>
                      <div className={`text-xs font-bold px-4 py-1.5 rounded-xl uppercase tracking-widest border-b-2
                        ${isLocked ? 'bg-border-b-color text-neutral-400 border-border-color' : isFinished ? 'bg-success-bg text-[#46A302] border-[#58CC02]' : 'bg-[#FFC800] text-yellow-900 border-[#CC9A00]'}`}>
                        {mod.unit}
                      </div>
                      <div className="flex-1 h-0.5 bg-border-color"></div>
                    </div>

                    <div className="flex flex-col items-center gap-3 relative w-full group">
                      {idx !== 0 && (
                         <div className={`absolute -top-16 left-1/2 -translate-x-1/2 h-16 border-l-4 border-dashed ${isFinished || !isLocked ? 'border-[#58CC02]' : 'border-border-color'}`}></div>
                      )}
                      
                      {isLocked ? (
                        <div
                          className="w-20 h-20 rounded-full border-b-8 flex items-center justify-center shadow-md relative z-10 grayscale opacity-50 bg-neutral-300 text-muted"
                        >
                          <span className="text-3xl">{mod.icon}</span>
                        </div>
                      ) : (
                        <Link 
                          href={`/lesson?lang=${profile.target_language || 'Arabic'}&module=${mod.id}`}
                          className={`w-20 h-20 rounded-full border-b-8 flex items-center justify-center transform transition-all cursor-pointer shadow-md relative z-10 hover:-translate-y-1 
                            ${isFinished ? 'animate-pulse-slow ring-4 ring-[#58CC02]/20' : ''}`}
                          style={{ 
                            backgroundColor: isFinished ? '#58CC02' : mod.color, 
                            borderColor: isFinished ? '#46A302' : mod.border 
                          }}
                        >
                          <span className="text-3xl group-hover:scale-110 transition-transform">{mod.icon}</span>
                          
                          {/* Tick Label if Finished */}
                          {isFinished && (
                            <div className="absolute -right-2 top-0 bg-[#58CC02] rounded-full p-1.5 border-4 border-surface shadow-sm animate-in zoom-in duration-300">
                               <CheckCircle2 className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </Link>
                      )}
                      <h3 className={`text-sm font-extrabold uppercase tracking-wide ${isLocked ? 'text-neutral-400' : isFinished ? 'text-[#58CC02]' : 'text-[#58CC02]'}`}>
                        {mod.name}
                      </h3>
                    </div>
                  </div>
                )
              })}

          </div>
        </div>

        {/* Right Column: Mini Stats Board */}
        <div className="space-y-6">

          {/* AI Coach Action Widget */}
          <Link href={`/tutor?lang=${profile.target_language || 'Arabic'}`} className="block bg-surface p-6 rounded-3xl border-2 border-border-color shadow-sm border-b-[6px] hover:bg-surface-hover active:border-b-2 active:translate-y-1 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-[#CE82FF] rounded-full border-b-4 border-[#9F56D2] flex items-center justify-center shadow-sm">
                <span className="text-2xl text-white">🤖</span>
              </div>
              <div>
                <h3 className="font-extrabold text-foreground text-lg leading-tight">Coach Lingo</h3>
                <p className="text-bold font-bold text-xs uppercase tracking-widest">AI Tutor</p>
              </div>
            </div>
            <p className="text-muted font-medium text-sm leading-relaxed mb-4">
              Practice having real conversations in {profile.target_language || 'Arabic'} with your 24/7 AI tutor!
            </p>
            <div className="w-full text-center uppercase tracking-widest text-sm font-bold text-[#CE82FF]">
              Start Chatting
            </div>
          </Link>

          {/* New: Dedicated Course Progress Widget */}
          <div className="bg-surface p-6 rounded-3xl border-2 border-border-color shadow-sm">
            <h3 className="font-extrabold text-foreground text-lg mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-[#FFC800]" />
              Course Progress
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-foreground">
                <span>{profile.target_language}</span>
                <span>{Math.round((profile.completed_modules.length / modulesList.length) * 100)}%</span>
              </div>
              <div className="w-full bg-surface-hover h-3 rounded-full overflow-hidden border border-border-color">
                <div 
                  className="bg-[#58CC02] h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${(profile.completed_modules.length / modulesList.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs font-bold text-bold uppercase tracking-wide">
                {profile.completed_modules.length} of {modulesList.length} units completed
              </p>
              <Link 
                href="/setup?source=widget" 
                className="block text-center w-full py-2 bg-surface-hover text-[#58CC02] text-xs font-black uppercase tracking-widest rounded-xl hover:bg-info-hover transition-colors"
              >
                Change Course
              </Link>
            </div>
          </div>

          <div className="bg-surface p-6 rounded-3xl border-2 border-border-color shadow-sm">
            <h3 className="font-extrabold text-foreground text-lg mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#FFC800] fill-current" />
              Leagues
            </h3>
            <p className="text-muted font-medium text-sm leading-relaxed mb-4">
              Complete a lesson to join this week's leaderboard and compete for top ranks!
            </p>
            <div className="w-full bg-surface-hover h-4 rounded-full overflow-hidden">
              <div className="bg-[#58CC02] w-1/4 h-full rounded-full"></div>
            </div>
            <p className="text-xs font-bold text-bold mt-2 uppercase tracking-wide text-center">In Bronze League</p>
          </div>

          <div className="bg-surface p-6 rounded-3xl border-2 border-border-color shadow-sm">
            <h3 className="font-extrabold text-foreground text-lg mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-neutral-400" />
              Account
            </h3>
            <div className="text-sm font-medium text-muted space-y-4">
              <div className="flex justify-between items-center border-b-2 border-[#F7F7F7] pb-3">
                <span>Manage Subscription</span>
                <span className="text-[#58CC02] font-bold cursor-pointer hover:underline">View</span>
              </div>
              <div className="flex justify-between items-center pb-1 group">
                 <form action="/auth/signout" method="post" className="w-full">
                  <button className="w-full text-left text-[#FF4B4B] font-bold hover:underline">
                    Sign Out
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
