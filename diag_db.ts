import { createClient } from './src/lib/supabase/client'

async function checkLessons() {
  const supabase = createClient()
  
  console.log('Counting lessons by language...')
  
  const { data, error } = await supabase
    .from('lessons')
    .select('lang')

  if (error) {
    console.error('Error fetching lessons:', error.message)
    return
  }

  if (data) {
    const counts: Record<string, number> = {}
    data.forEach(l => {
      counts[l.lang] = (counts[l.lang] || 0) + 1
    })
    
    console.log('Lesson Counts:', counts)
    
    if (Object.keys(counts).length === 0) {
      console.warn('⚠️ No lessons found in the database! Users will see "Coming Soon!" on all pages.')
    }
  }
  
  console.log('Checking profiles...')
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('full_name, target_language')
    .limit(5)
    
  if (profileError) {
    console.error('Error fetching profiles:', profileError.message)
  } else {
    console.log('Sample Profiles:', profiles)
  }
}

checkLessons()
