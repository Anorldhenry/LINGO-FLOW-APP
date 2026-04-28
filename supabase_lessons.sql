-- Create lessons table
CREATE TABLE lessons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    external_id TEXT UNIQUE, -- original id from lesson-data.ts (e.g., 'a1-1')
    lang TEXT NOT NULL,
    module_name TEXT NOT NULL,
    module_order INTEGER DEFAULT 0,
    type TEXT NOT NULL, -- 'mcq', 'translation', 'listening'
    question TEXT NOT NULL,
    options JSONB, -- store options as JSONB array
    answer TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for fast retrieval of lessons by language and module
CREATE INDEX idx_lessons_lang_module ON lessons(lang, module_name);

-- Enable Row Level Security
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read lessons
CREATE POLICY "Lessons are viewable by authenticated users." ON lessons
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow admins to manage lessons (assuming email check for now or isAdmin flag in metadata)
CREATE POLICY "Admins can manage lessons." ON lessons
  FOR ALL USING (
    auth.jwt() ->> 'email' = 'superadmin@lingoflow.ai' OR 
    (auth.jwt() -> 'user_metadata' ->> 'isAdmin')::boolean = true
  );
