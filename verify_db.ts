import { createClient } from './src/lib/supabase/client'

async function checkSchema() {
  const supabase = createClient()
  
  console.log('Checking database schema...')
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)

  if (error) {
    console.error('Error fetching profiles:', error.message)
    return
  }

  if (data && data.length >= 0) {
    const columns = Object.keys(data[0] || {})
    const required = ['completed_modules', 'last_lesson_lang', 'last_lesson_module', 'last_lesson_index']
    
    console.log('Found columns:', columns.join(', '))
    
    const missing = required.filter(col => !columns.includes(col))
    
    if (missing.length === 0) {
      console.log('✅ ALL progress columns successfully verified!')
    } else {
      console.error('❌ MISSING columns:', missing.join(', '))
      console.log('Please ensure you ran the SQL script in your Supabase dashboard.')
    }
  }
}

checkSchema()
