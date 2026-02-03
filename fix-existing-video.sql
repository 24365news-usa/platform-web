-- Add thumbnail_url column if it doesn't exist
ALTER TABLE videos ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Update the Dorado Beach weather video with playback_id and thumbnail
UPDATE videos 
SET 
  mux_playback_id = 'NWxHfKEy9GLyp012EnZf1OJq27k6zpGI2024hcnEdPUJY',
  thumbnail_url = 'https://image.mux.com/NWxHfKEy9GLyp012EnZf1OJq27k6zpGI2024hcnEdPUJY/thumbnail.jpg?width=320&height=180&fit_mode=smartcrop'
WHERE title = 'Dorado Beach Weather Report - Wednesday';

-- Also let's check what we have
SELECT id, title, mux_playbook_id, mux_playback_id, thumbnail_url, view_count, status 
FROM videos 
WHERE title LIKE '%Dorado%';