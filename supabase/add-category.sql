-- Add category column to videos table
ALTER TABLE videos ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general';

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);

-- Update the existing video to have a category
UPDATE videos SET category = 'weather' WHERE title ILIKE '%weather%';
