import { createClient } from '@/lib/supabase/server'
import { CheckCircle2, Flame, Trophy, CalendarClock } from 'lucide-react'

export default async function AdminUsersPage() {
  const supabase = await createClient()

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('xp', { ascending: false })

  return (
    <div className="animate-in fade-in duration-500">
      
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Learner Directory</h2>
          <p className="text-bold font-bold">Manage all registered users and view their progress.</p>
        </div>
        <div className="bg-info-bg text-[#58CC02] px-4 py-2 rounded-2xl font-extrabold text-sm border-2 border-[#58CC02]">
          {profiles?.length || 0} Total
        </div>
      </div>

      <div className="bg-surface rounded-[32px] border-2 border-border-color overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-hover border-b-2 border-border-color text-bold text-[11px] uppercase tracking-widest font-black">
                <th className="p-6">Learner</th>
                <th className="p-6">Target Language</th>
                <th className="p-6 text-center">Stats</th>
                <th className="p-6 text-center">Modules Won</th>
                <th className="p-6 text-right">Joined / Activity</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium focus-within:bg-surface-hover">
              {profiles && profiles.length > 0 ? (
                profiles.map((profile, i) => (
                  <tr key={profile.id} className="border-b-2 border-border-color hover:bg-background/50 transition-colors">
                    
                    {/* Learner Info */}
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#58CC02] rounded-full text-white flex items-center justify-center font-extrabold shadow-sm ring-2 ring-surface">
                          {profile.full_name?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div className="font-extrabold text-foreground">
                          {profile.full_name || 'Anonymous Learner'}
                        </div>
                      </div>
                    </td>

                    {/* Language Segment */}
                    <td className="p-6 text-muted font-bold">
                      {profile.target_language ? (
                         <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-border-color rounded-xl">
                            <CheckCircle2 className="h-4 w-4 text-[#58CC02]" /> {profile.target_language}
                         </span>
                      ) : '—'}
                    </td>

                    {/* Stats */}
                    <td className="p-6">
                      <div className="flex items-center justify-center gap-4 font-bold">
                        <div className="flex items-center gap-1.5 text-[#FF9600]">
                          <Flame className="h-4 w-4 fill-current" /> {profile.streak || 0}
                        </div>
                        <div className="flex items-center gap-1.5 text-[#58CC02]">
                          <Trophy className="h-4 w-4 fill-current" /> {profile.xp || 0} XP
                        </div>
                      </div>
                    </td>

                    {/* Modules Completed */}
                    <td className="p-6 text-center">
                       <span className="inline-block px-3 py-1 bg-success-bg text-[#46A302] rounded-xl font-extrabold text-xs border border-[#58CC02]/20">
                          {profile.completed_modules?.length || 0}
                       </span>
                    </td>

                    {/* Activity */}
                    <td className="p-6 text-right text-bold font-bold">
                       <div className="flex items-center justify-end gap-2">
                         <CalendarClock className="h-4 w-4" />
                         {profile.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'N/A'}
                       </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-bold font-bold">
                    No learners found on the platform yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
