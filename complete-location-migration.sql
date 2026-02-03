-- Complete location migration - add all missing columns for journalist location input
-- Run this in Supabase SQL Editor

-- Add category column
ALTER TABLE videos ADD COLUMN IF NOT EXISTS category TEXT;

-- Add country column  
ALTER TABLE videos ADD COLUMN IF NOT EXISTS country TEXT;

-- Add state and city columns (if not already added)
ALTER TABLE videos ADD COLUMN IF NOT EXISTS state TEXT;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS city TEXT;

-- Add thumbnail_url column if not exists
ALTER TABLE videos ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Create indexes for filtering
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);
CREATE INDEX IF NOT EXISTS idx_videos_country ON videos(country);
CREATE INDEX IF NOT EXISTS idx_videos_state ON videos(state);
CREATE INDEX IF NOT EXISTS idx_videos_city ON videos(city);
CREATE INDEX IF NOT EXISTS idx_videos_location ON videos(country, state, city);

-- Update existing videos with default values
UPDATE videos 
SET 
  country = 'US',
  state = 'Puerto Rico', 
  city = 'Dorado',
  category = 'weather'
WHERE country IS NULL AND title ILIKE '%dorado%beach%weather%';

-- Show the updated schema
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'videos' 
ORDER BY ordinal_position;