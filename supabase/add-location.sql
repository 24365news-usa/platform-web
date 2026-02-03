-- Add location fields to videos table
ALTER TABLE videos ADD COLUMN IF NOT EXISTS state TEXT;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS city TEXT;

-- Create indexes for location filtering
CREATE INDEX IF NOT EXISTS idx_videos_state ON videos(state);
CREATE INDEX IF NOT EXISTS idx_videos_city ON videos(city);
CREATE INDEX IF NOT EXISTS idx_videos_state_city ON videos(state, city);

-- Update existing video with location
UPDATE videos 
SET state = 'Puerto Rico', city = 'Dorado' 
WHERE title ILIKE '%dorado%' OR description ILIKE '%dorado%';
