import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { LESSON_BANKS } from '@/lib/lesson-data'

export async function POST() {
  const supabase = await createClient()

  // Verify admin status
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || (!user.user_metadata?.isAdmin && user.email !== 'superadmin@lingoflow.ai')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const lessonsToInsert: any[] = []

  // Flatten LESSON_BANKS into a format suitable for the database
  Object.entries(LESSON_BANKS).forEach(([lang, lessons]) => {
    lessons.forEach((lesson, index) => {
      // Determine module name based on comments/chunks in the original file
      // Since the original file and logic uses index/id to determine progress, 
      // we'll preserve the 'id' as 'external_id'.
      
      let moduleName = 'General'
      // Simple logic to group by id prefix or index if needed
      // Most ids are like 'a1-1', 'k2-1', etc.
      const match = lesson.id.match(/^([a-z])(\d+)/i)
      if (match) {
        moduleName = `Module ${match[2]}`
      }

      lessonsToInsert.push({
        external_id: lesson.id,
        lang,
        module_name: moduleName,
        module_order: match ? parseInt(match[2]) : 0,
        type: lesson.type,
        question: lesson.question,
        options: lesson.options || [],
        answer: lesson.answer
      })
    })
  })

  // Upsert into the lessons table
  const { error } = await supabase
    .from('lessons')
    .upsert(lessonsToInsert, { onConflict: 'external_id' })

  if (error) {
    console.error('Migration error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ 
    success: true, 
    count: lessonsToInsert.length 
  })
}
