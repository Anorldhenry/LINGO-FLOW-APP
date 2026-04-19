-- Add a column to track completed modules as an array of strings
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS completed_modules text[] DEFAULT ARRAY[]::text[];
