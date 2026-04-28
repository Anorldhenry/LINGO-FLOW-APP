-- Create tutor_messages table for persistent chat history
CREATE TABLE IF NOT EXISTS public.tutor_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    lang TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    tip TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.tutor_messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own tutor history"
ON public.tutor_messages
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tutor messages"
ON public.tutor_messages
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Index for faster history lookup
CREATE INDEX IF NOT EXISTS tutor_messages_user_lang_idx ON public.tutor_messages (user_id, lang, created_at);
