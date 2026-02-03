-- Add country field to videos table for international support
ALTER TABLE videos ADD COLUMN IF NOT EXISTS country TEXT;

-- Create index for country filtering
CREATE INDEX IF NOT EXISTS idx_videos_country ON videos(country);
CREATE INDEX IF NOT EXISTS idx_videos_country_state ON videos(country, state);

-- Set existing videos to US (since they're Puerto Rico/US content)
UPDATE videos 
SET country = 'US' 
WHERE country IS NULL;