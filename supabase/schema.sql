-- 24365.News Database Schema
-- Run this in Supabase SQL Editor

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Content
  title TEXT NOT NULL,
  description TEXT,
  
  -- User (from Clerk)
  user_id TEXT NOT NULL,
  user_name TEXT,
  
  -- Mux video
  mux_upload_id TEXT,
  mux_asset_id TEXT,
  mux_playback_id TEXT,
  duration FLOAT,
  
  -- Status: uploading, processing, ready, error
  status TEXT NOT NULL DEFAULT 'uploading',
  error_message TEXT,
  
  -- Metadata
  view_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE
);

-- Contributors table (extends Clerk users)
CREATE TABLE IF NOT EXISTS contributors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Clerk user ID
  user_id TEXT UNIQUE NOT NULL,
  
  -- Profile
  display_name TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  
  -- Status: pending, approved, suspended
  status TEXT NOT NULL DEFAULT 'pending',
  
  -- Stats (denormalized for performance)
  video_count INTEGER DEFAULT 0,
  total_views INTEGER DEFAULT 0
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_videos_user_id ON videos(user_id);
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_videos_published ON videos(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_videos_mux_upload_id ON videos(mux_upload_id);
CREATE INDEX IF NOT EXISTS idx_videos_mux_asset_id ON videos(mux_asset_id);
CREATE INDEX IF NOT EXISTS idx_contributors_user_id ON contributors(user_id);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON videos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER update_contributors_updated_at
  BEFORE UPDATE ON contributors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributors ENABLE ROW LEVEL SECURITY;

-- Policies: Videos are public to read when published
CREATE POLICY "Published videos are viewable by everyone" ON videos
  FOR SELECT USING (is_published = true);

-- Policies: Users can manage their own videos
CREATE POLICY "Users can manage their own videos" ON videos
  FOR ALL USING (auth.uid()::text = user_id OR auth.role() = 'service_role');

-- Service role bypasses RLS for webhooks
CREATE POLICY "Service role full access to videos" ON videos
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to contributors" ON contributors
  FOR ALL USING (auth.role() = 'service_role');
