import { createClient } from '@/lib/supabase/server'
import { MessageSquare, CalendarClock } from 'lucide-react'
import { DeletePostButton } from './DeletePostButton'

export default async function AdminCommunityPage() {
  const supabase = await createClient()

  // Fetch all posts with user profiles associated
  const { data: posts, error } = await supabase
    .from('community_posts')
    .select(`
      id,
      content,
      post_type,
      lang,
      created_at,
      profiles (
        full_name
      )
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="animate-in fade-in duration-500">
      
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-2 tracking-tight">Community Moderation</h2>
          <p className="text-bold font-bold">Review and moderate user posts across all language hubs.</p>
        </div>
        <div className="bg-success-bg text-[#58CC02] px-4 py-2 rounded-2xl font-extrabold text-sm border-2 border-[#58CC02]">
          {posts?.length || 0} Total Posts
        </div>
      </div>

      <div className="bg-surface rounded-[32px] border-2 border-border-color overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-hover border-b-2 border-border-color text-bold text-[11px] uppercase tracking-widest font-black">
                <th className="p-6 w-1/2">Post Content</th>
                <th className="p-6">Metadata</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium focus-within:bg-surface-hover">
              {posts && posts.length > 0 ? (
                posts.map((post: any) => (
                  <tr key={post.id} className="border-b-2 border-border-color hover:bg-background/50 transition-colors">
                    
                    {/* Post Content */}
                    <td className="p-6 align-top">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-surface-hover rounded-full text-bold flex items-center justify-center font-extrabold shrink-0 border border-border-color">
                          {post.profiles?.full_name?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <div>
                          <div className="font-extrabold text-foreground mb-1">
                            {post.profiles?.full_name || 'Anonymous'}
                          </div>
                          <p className="text-foreground leading-relaxed">
                            {post.content}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Metadata */}
                    <td className="p-6 align-top text-muted font-bold">
                       <div className="flex flex-col gap-2">
                         <div>
                           <span className={`inline-block px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border
                             ${post.post_type === 'question' ? 'bg-success-bg text-[#58CC02] border-[#58CC02]/20' : 'bg-success-bg text-[#58CC02] border-[#58CC02]/20'}`}>
                             {post.post_type || 'General'}
                           </span>
                         </div>
                         <div className="flex items-center gap-1.5 text-xs">
                           <strong>Hub:</strong> {post.lang}
                         </div>
                         <div className="flex items-center gap-1.5 text-xs">
                           <CalendarClock className="h-3 w-3" />
                           {new Date(post.created_at).toLocaleDateString()}
                         </div>
                       </div>
                    </td>

                    {/* Actions */}
                    <td className="p-6 align-top text-right">
                       <div className="flex items-center justify-end">
                         <DeletePostButton postId={post.id} />
                       </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-12 text-center text-bold font-bold">
                    No community posts found.
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
