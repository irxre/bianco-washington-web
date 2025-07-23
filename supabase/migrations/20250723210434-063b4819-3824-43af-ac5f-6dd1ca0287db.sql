
-- Create reservations table
CREATE TABLE IF NOT EXISTS public.reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INTEGER NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert reservations (public form)
CREATE POLICY "Anyone can create reservations" ON public.reservations
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reading reservations (for admin purposes)
CREATE POLICY "Allow read access to reservations" ON public.reservations
  FOR SELECT USING (true);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS reservations_email_idx ON public.reservations(email);

-- Create an index on date for faster date-based queries
CREATE INDEX IF NOT EXISTS reservations_date_idx ON public.reservations(date);
