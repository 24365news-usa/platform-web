-- Add thumbnail_url column to videos table
ALTER TABLE videos ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Update existing videos that have playback_ids but no thumbnail_url
UPDATE videos 
SET thumbnail_url = 'https://image.mux.com/' || mux_playback_id || '/thumbnail.jpg?width=640&height=360&fit_mode=smartcrop'
WHERE mux_playback_id IS NOT NULL 
  AND (thumbnail_url IS NULL OR thumbnail_url = '');