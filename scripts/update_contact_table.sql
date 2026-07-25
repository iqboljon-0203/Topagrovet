-- Supabase SQL Editor-da ishga tushiring (Run)
ALTER TABLE public.contact_info
ADD COLUMN IF NOT EXISTS topbar_marquee TEXT DEFAULT 'Sifatli veterinariya va agro preparatlar hamda barcha turdagi ozuqa qoshimchalari!';
