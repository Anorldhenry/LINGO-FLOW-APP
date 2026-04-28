-- Create community_posts table
CREATE TABLE community_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  lang TEXT NOT NULL,
  content TEXT NOT NULL,
  post_type TEXT DEFAULT 'practice' CHECK (post_type IN ('practice', 'question')),
  likes_count INTEGER DEFAULT 0
);

-- Create community_replies table
CREATE TABLE community_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  post_id UUID REFERENCES community_posts ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_replies ENABLE ROW LEVEL SECURITY;

-- Policies for community_posts
CREATE POLICY "Public posts are viewable by everyone." ON community_posts
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create posts." ON community_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts." ON community_posts
  FOR DELETE USING (auth.uid() = user_id);

-- Policies for community_replies
CREATE POLICY "Public replies are viewable by everyone." ON community_replies
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create replies." ON community_replies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own replies." ON community_replies
  FOR DELETE USING (auth.uid() = user_id);
