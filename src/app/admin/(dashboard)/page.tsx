import { createClient } from '@/lib/supabase/server'
import { Users, Trophy, Flame, Languages } from 'lucide-react'

export default async function AdminOverview() {
  const supabase = await createClient()
  
  // Fetch overall statistics
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')

  const totalUsers = profiles?.length || 0
  const totalXp = profiles?.reduce((sum, p) => sum + (p.xp || 0), 0) || 0
  const totalStreaks = profiles?.reduce((sum, p) => sum + (p.streak || 0), 0) || 0
  
  // Pre-seed language counts so all platforms show up in the UI even with 0 users
  const initialLanguages: Record<string, number> = {
    'Arabic': 0,
    'Runyankore': 0,
    'Kiswahili': 0,
    'Luganda': 0
  }

  // Get language popularity
  const languageCounts = profiles?.reduce((acc: Record<string, number>, p) => {
    const lang = p.target_language
    if (lang) {
       acc[lang] = (acc[lang] || 0) + 1
    }
    return acc
  }, initialLanguages) || initialLanguages

  const topLanguage = Object.entries(languageCounts)
    .filter(([_, count]) => count > 0)
    .sort(([, a]: [string, number], [, b]: [string, number]) => b - a)[0]?.[0] || 'N/A'

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Overview Dashboard</h2>
        <p className="text-bold font-bold">Monitor the health and engagement of the Lingo Flow learning platform.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Users */}
        <div className="bg-surface p-6 rounded-3xl border-2 border-border-color border-b-[6px] shadow-sm transform hover:-translate-y-1 transition-transform">
          <div className="bg-info-bg w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
             <Users className="h-6 w-6 text-[#58CC02]" />
          </div>
          <p className="text-[11px] font-black text-bold uppercase tracking-widest mb-1">Total Learners</p>
          <h3 className="text-3xl font-extrabold text-foreground">{totalUsers}</h3>
        </div>

        {/* Global XP */}
        <div className="bg-surface p-6 rounded-3xl border-2 border-border-color border-b-[6px] shadow-sm transform hover:-translate-y-1 transition-transform relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10">
            <Trophy className="h-32 w-32 text-[#FFC800]" />
          </div>
          <div className="bg-warning-bg w-12 h-12 rounded-2xl flex items-center justify-center mb-4 relative z-10">
             <Trophy className="h-6 w-6 text-[#FFC800]" />
          </div>
          <p className="text-[11px] font-black text-bold uppercase tracking-widest mb-1 relative z-10">Global XP Earned</p>
          <h3 className="text-3xl font-extrabold text-foreground relative z-10">{totalXp.toLocaleString()}</h3>
        </div>

        {/* Total Streaks */}
        <div className="bg-surface p-6 rounded-3xl border-2 border-border-color border-b-[6px] shadow-sm transform hover:-translate-y-1 transition-transform">
          <div className="bg-warning-bg w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
             <Flame className="h-6 w-6 text-[#FF9600]" />
          </div>
          <p className="text-[11px] font-black text-bold uppercase tracking-widest mb-1">Total Active Streaks</p>
          <h3 className="text-3xl font-extrabold text-foreground">{totalStreaks} <span className="text-sm font-bold text-[#FF9600]">days</span></h3>
        </div>

        {/* Top Language */}
        <div className="bg-surface p-6 rounded-3xl border-2 border-border-color border-b-[6px] shadow-sm transform hover:-translate-y-1 transition-transform">
          <div className="bg-success-bg w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
             <img src="/assets/logo-transparent.png" alt="Popular" className="h-6 w-auto" />
          </div>
          <p className="text-[11px] font-black text-bold uppercase tracking-widest mb-1">Most Popular</p>
          <h3 className="text-3xl font-extrabold text-foreground">{topLanguage}</h3>
        </div>

      </div>

      {/* Language Breakdown Section */}
      <div className="bg-surface rounded-3xl border-2 border-border-color p-8 mt-8 shadow-sm">
         <h3 className="text-xl font-extrabold text-foreground mb-6">Language Distribution</h3>
         <div className="space-y-4">
           {Object.entries(languageCounts).map(([lang, count]) => {
             const percentage = totalUsers > 0 ? ((count / totalUsers) * 100).toFixed(1) : 0
             return (
               <div key={lang} className="flex items-center gap-4">
                 <div className="w-32 text-sm font-bold text-muted">{lang}</div>
                 <div className="flex-1 bg-surface-hover h-4 rounded-full overflow-hidden">
                   <div 
                     className="bg-[#58CC02] h-full rounded-full transition-all duration-1000" 
                     style={{ width: `${percentage}%` }}
                   />
                 </div>
                 <div className="w-16 text-right text-sm font-black text-foreground">{percentage}%</div>
               </div>
             )
           })}
           {Object.keys(languageCounts).length === 0 && (
             <div className="text-center text-bold font-bold py-4">No data available yet.</div>
           )}
         </div>
      </div>
    </div>
  )
}
