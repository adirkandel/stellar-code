-- Create contact_submissions table for rate limiting
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  ip_address text,
  submitted_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow the edge function to insert (public access)
CREATE POLICY "Allow public insert" ON public.contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow the edge function to select (public access)
CREATE POLICY "Allow public select" ON public.contact_submissions
  FOR SELECT
  USING (true);

-- Create index for faster lookups
CREATE INDEX idx_contact_submissions_email_time ON public.contact_submissions(email, submitted_at DESC);
CREATE INDEX idx_contact_submissions_ip_time ON public.contact_submissions(ip_address, submitted_at DESC);

-- Create function to clean up old submissions (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_contact_submissions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.contact_submissions
  WHERE submitted_at < now() - interval '24 hours';
END;
$$;