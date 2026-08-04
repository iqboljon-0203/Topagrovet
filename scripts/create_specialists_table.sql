-- Specialists (mutaxassislar) jadvali
-- Supabase SQL Editor da ishlatish uchun

CREATE TABLE IF NOT EXISTS specialists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_ru TEXT,
  role TEXT,
  role_ru TEXT,
  phone TEXT,
  telegram_link TEXT,
  photo_url TEXT,
  type TEXT DEFAULT 'agro', -- 'agro' yoki 'vet'
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Misol ma'lumotlar (o'zgartiring)
INSERT INTO specialists (name, name_ru, role, role_ru, phone, telegram_link, type, sort_order) VALUES
  ('Agronomist ism familiya', 'Агроном имя фамилия', 'Bosh agronomist', 'Главный агроном', '+998 90 000 00 00', 'https://t.me/username', 'agro', 1),
  ('Veterinar ism familiya', 'Ветеринар имя фамилия', 'Veterinar shifokor', 'Ветеринарный врач', '+998 90 000 00 01', 'https://t.me/username2', 'vet', 2);

-- Row Level Security (RLS) — hamma ko'ra olsin
ALTER TABLE specialists ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read" ON specialists;
DROP POLICY IF EXISTS "Allow auth users to manage" ON specialists;

CREATE POLICY "Allow public read" ON specialists
  FOR SELECT USING (TRUE);

CREATE POLICY "Allow auth users to manage" ON specialists
  FOR ALL USING (auth.role() = 'authenticated');
