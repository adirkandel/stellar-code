-- Fix search_path for cleanup function
CREATE OR REPLACE FUNCTION public.cleanup_old_contact_submissions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.contact_submissions
  WHERE submitted_at < now() - interval '24 hours';
END;
$$;