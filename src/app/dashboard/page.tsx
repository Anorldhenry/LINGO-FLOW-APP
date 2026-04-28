import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LevelTwoList } from '@/components/LevelTwoList'
import { Sparkles, Trophy as TrophyIcon } from 'lucide-react'
import { LogOut, Flame, Trophy, Shield, Settings, CheckCircle2, Users } from 'lucide-react'

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
    completed_modules: [] as string[],
    subscription_tier: 'free' as string | null
  }

  try {
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !authUser) {
       // If we're strictly checking and it's missing, go to auth
       if (process.env.NODE_ENV === 'production') redirect('/auth')
       user = authUser
    } else {
      user = authUser
      
      // Fetch profile details with a timeout-like behavior (single query)
      const { data: dbProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()
        
      if (dbProfile) {
        profile = {
           full_name: dbProfile.full_name || 'Learner',
           xp: dbProfile.xp || 0,
           streak: dbProfile.streak || 0,
           target_language: dbProfile.target_language,
           last_lesson_lang: dbProfile.last_lesson_lang,
           last_lesson_module: dbProfile.last_lesson_module,
           last_lesson_index: dbProfile.last_lesson_index || 0,
           completed_modules: dbProfile.completed_modules || [],
           subscription_tier: dbProfile.subscription_tier || 'free'
        }
      }
    }
  } catch (e) {
    console.error("Dashboard Auth Error:", e)
  }

  // Route Protection: Only redirect if we are absolutely certain there is no user
  if (!user && !profile.target_language && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    // Check if we are actually on a dev environment where we might want to bypass
    if (process.env.NODE_ENV === 'production') redirect('/auth')
  }

  // Force onboarding if language isn't picked
  if (user && !profile.target_language) {
    redirect('/setup')
  }

  const modulesList = [
    // LEVEL 1: Foundations
    { id: 'greetings', level: 1, unit: 'Unit 1: Greetings', name: 'Greetings', icon: '🗣', color: '#58CC02', border: '#357B00' },
    { id: 'time', level: 1, unit: 'Unit 2: Time and Days', name: 'Time & Days', icon: '⏰', color: '#58CC02', border: '#46A302' },
    { id: 'actions', level: 1, unit: 'Unit 3: Actions', name: 'Actions', icon: '🏃', color: '#CE82FF', border: '#9F56D2' },
    { id: 'questions', level: 1, unit: 'Unit 4: Questions', name: 'Questions', icon: '❓', color: '#FF9600', border: '#D97E00' },
    { id: 'conversations', level: 1, unit: 'Unit 5: Market chat', name: 'Market Chat', icon: '💬', color: '#FF4B4B', border: '#D33131' },
    { id: 'advanced', level: 1, unit: 'Unit 6: Advanced', name: 'Advanced', icon: '🚀', color: '#58CC02', border: '#357B00' },

    // LEVEL 2: Mastery
    { id: 'professional', level: 2, unit: 'Unit 7: Workplace', name: 'Workplace', icon: '💼', color: '#58CC02', border: '#357B00' },
    { id: 'planning', level: 2, unit: 'Unit 8: Future', name: 'Future', icon: '📅', color: '#CE82FF', border: '#9F56D2' },
    { id: 'storytelling', level: 2, unit: 'Unit 9: Past', name: 'Past', icon: '📖', color: '#FF9600', border: '#D97E00' },
    { id: 'logic', level: 2, unit: 'Unit 10: Opinion', name: 'Opinion', icon: '🧠', color: '#FF4B4B', border: '#D33131' },
    { id: 'logistics', level: 2, unit: 'Unit 11: Logistics', name: 'Logistics', icon: '✈️', color: '#1CB0F6', border: '#1899D6' },
    { id: 'fluency', level: 2, unit: 'Unit 12: Expert', name: 'Expert', icon: '👑', color: '#FFC800', border: '#CC9A00' },
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
              <div className="bg-[#58CC02] h-8 w-8 rounded-full flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-surface">
                {profile.full_name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="max-w-5xl mx-auto px-4 pt-20 pb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Learning Path */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Resume Progress Card */}
          {profile.last_lesson_lang && (
            <div className="bg-surface p-5 rounded-2xl border-2 border-[#58CC02] shadow-sm flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
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

          <div className="bg-[#58CC02] p-6 rounded-3xl border-b-[6px] border-[#46A302] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm overflow-hidden relative">
            <div className="flex flex-col md:flex-row items-center gap-6 z-10">
              {/* Lingo Baby Mascot Welcome - Polished */}
              <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0 animate-float">
                <img 
                  src="/assets/mascot_idle.png" 
                  alt="Lingo Baby Welcome"
                  className="w-full h-auto object-contain drop-shadow-lg"
                />
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-xl text-sm font-bold border-2 border-white/20">
                    <CheckCircle2 className="h-4 w-4" /> Learning {profile.target_language}
                  </div>
                  {profile.subscription_tier && profile.subscription_tier !== 'free' && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl text-sm font-black border-2 border-yellow-300 shadow-sm animate-pulse-slow">
                      <Sparkles className="h-4 w-4" /> PRO
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-extrabold mb-1">Welcome, {profile.full_name}!</h2>
                <p className="font-medium opacity-90">Ready to crush your daily goals?</p>
              </div>
            </div>
            <Link href={`/lesson?lang=${profile.target_language}&module=${activeModuleId}`} className="whitespace-nowrap uppercase tracking-widest text-sm font-bold bg-surface text-[#58CC02] hover:bg-surface-hover px-8 py-4 rounded-2xl border-b-4 border-border-color active:border-b-0 active:translate-y-1 transition-all shadow-sm z-10">
              Continue: {modulesList[activeIndex].name}
            </Link>
          </div>

          {/* New: Upgrade to Pro Card for Free Users */}
          {(!profile.subscription_tier || profile.subscription_tier === 'free') && (
            <Link href={`/tutor?lang=${profile.target_language}`} className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-3xl border-2 border-yellow-500/30 flex items-center justify-between group hover:border-yellow-500/60 transition-all shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Sparkles className="h-24 w-24 text-yellow-500" />
               </div>
               <div className="z-10">
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    Upgrade to Lingo Flow Pro 
                    <span className="bg-yellow-500 text-black text-[10px] px-2 py-0.5 rounded-md">SAVE 50%</span>
                  </h3>
                  <p className="text-neutral-400 font-medium text-sm mt-1 max-w-md">Get unlimited AI coaching, ad-free experience, and master languages 3x faster with Coach Lingo.</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-yellow-500 font-bold text-sm">
                    View Pricing Plans →
                  </div>
               </div>
            </Link>
          )}

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

          <div className="space-y-12">
            {/* LEVEL 1 SECTION */}
            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-0.5 flex-1 bg-border-color"></div>
                <h2 className="text-xl font-black text-[#58CC02] uppercase tracking-[0.2em]">Level 1: Foundations</h2>
                <div className="h-0.5 flex-1 bg-border-color"></div>
              </div>
              
              <div className="bg-surface rounded-3xl border-2 border-border-color p-6 flex flex-col items-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-border-color/30 -z-0"></div>
                {modulesList.filter(m => m.level === 1).map((mod, idx) => {
                  const isFinished = profile.completed_modules.includes(mod.id);
                  const isLocked = modulesList.findIndex(m => m.id === mod.id) > activeIndex && !isFinished;
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
                          </div>
                        ) : (
                          <Link 
                            href={`/lesson?lang=${profile.target_language || 'Arabic'}&module=${mod.id}`}
                            className={`w-20 h-20 rounded-full border-b-8 flex items-center justify-center transform transition-all cursor-pointer shadow-md relative z-10 hover:-translate-y-1 
                              ${isFinished ? 'animate-pulse-slow ring-4 ring-[#58CC02]/20' : 'ring-4 ring-transparent hover:ring-[#58CC02]/10'}`}
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
                        <h3 className={`text-sm font-extrabold uppercase tracking-wide ${isLocked ? 'text-neutral-400' : 'text-foreground'}`}>
                          {mod.name}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LEVEL 2 SECTION */}
            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-0.5 flex-1 bg-border-color"></div>
                <h2 className="text-xl font-black text-[#CE82FF] uppercase tracking-[0.2em]">Level 2: Mastery</h2>
                <div className="h-0.5 flex-1 bg-border-color"></div>
              </div>
              
              <div className="bg-surface rounded-3xl border-2 border-border-color p-6 flex flex-col items-center gap-8 relative overflow-hidden">
                <LevelTwoList modulesList={modulesList} profile={profile} activeIndex={activeIndex} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Mini Stats Board */}
        <div className="space-y-6">

          {/* NEW: Community Hub Widget */}
          <Link href={`/community?lang=${profile.target_language}`} className="block bg-gradient-to-br from-[#1CB0F6] to-[#1483C2] p-6 rounded-3xl text-white shadow-lg border-b-[6px] border-[#1483C2] hover:scale-[1.02] active:border-b-0 active:translate-y-1 transition-all overflow-hidden relative group">
             <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-125 transition-transform duration-500">
                <Users className="h-20 w-20" />
             </div>
             <div className="z-10 relative">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-80 italic">New Feature</p>
                <h3 className="text-xl font-black mb-1">Community Hub</h3>
                <p className="text-xs font-bold opacity-90 mb-4">Practice with other {profile.target_language} learners!</p>
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20">
                   Enter Hub
                </div>
             </div>
          </Link>

          {/* AI Coach Action Widget */}
          <Link href={`/tutor?lang=${profile.target_language}`} className="block bg-surface p-5 rounded-2xl border-2 border-border-color shadow-sm border-b-[6px] hover:bg-surface-hover active:border-b-2 active:translate-y-1 transition-all">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 bg-[#58CC02] rounded-full border-b-4 border-[#357B00] flex items-center justify-center shadow-sm overflow-hidden p-2">
                <img src="/assets/logo-transparent.png" className="w-full h-full object-contain" alt="Logo" />
              </div>
              <div>
                <h3 className="font-extrabold text-foreground text-lg leading-tight">Coach Lingo</h3>
                <p className="text-bold font-bold text-xs uppercase tracking-widest">AI Tutor</p>
              </div>
            </div>
            <p className="text-muted font-medium text-sm leading-relaxed mb-4">
              Practice having real conversations in {profile.target_language} with your 24/7 AI tutor!
            </p>
            <div className="w-full text-center uppercase tracking-widest text-sm font-bold text-[#58CC02]">
              Start Chatting
            </div>
          </Link>

          {/* New: Dedicated Course Progress Widget */}
          <div className="bg-surface p-5 rounded-2xl border-2 border-border-color shadow-sm">
            <h3 className="font-extrabold text-foreground text-lg mb-3 flex items-center gap-2">
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

          <div className="bg-surface p-5 rounded-2xl border-2 border-border-color shadow-sm">
            <h3 className="font-extrabold text-foreground text-lg mb-3 flex items-center gap-2">
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

          <div className="bg-surface p-5 rounded-2xl border-2 border-border-color shadow-sm">
            <h3 className="font-extrabold text-foreground text-lg mb-3 flex items-center gap-2">
              <Settings className="h-5 w-5 text-neutral-400" />
              Account
            </h3>
            <div className="text-sm font-medium text-muted space-y-4">
              <div className="flex justify-between items-center border-b-2 border-[#F7F7F7] pb-3">
                <span>Manage Subscription</span>
                <Link href={`/tutor?lang=${profile.target_language || 'Arabic'}`} className="text-[#58CC02] font-bold cursor-pointer hover:underline">View</Link>
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
