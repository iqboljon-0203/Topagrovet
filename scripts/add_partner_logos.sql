-- about_settings jadvaliga hamkor logolari ustunlarini qo'shish
-- Supabase SQL Editor da ishlatish uchun

ALTER TABLE about_settings 
  ADD COLUMN IF NOT EXISTS partner1_logo TEXT,
  ADD COLUMN IF NOT EXISTS partner2_logo TEXT;
