
-- Create table for RSVP submissions
CREATE TABLE public.rsvp_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.rsvp_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "Anyone can submit RSVP" ON public.rsvp_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Only authenticated users can read submissions
CREATE POLICY "Authenticated users can read submissions" ON public.rsvp_submissions
  FOR SELECT TO authenticated USING (true);
