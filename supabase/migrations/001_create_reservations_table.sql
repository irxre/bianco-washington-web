
-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INTEGER NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert reservations (for the public form)
CREATE POLICY "Anyone can insert reservations" ON reservations
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can view reservations (for admin)
CREATE POLICY "Only authenticated users can view reservations" ON reservations
  FOR SELECT USING (auth.role() = 'authenticated');

-- Only authenticated users can update reservations (for admin)
CREATE POLICY "Only authenticated users can update reservations" ON reservations
  FOR UPDATE USING (auth.role() = 'authenticated');
