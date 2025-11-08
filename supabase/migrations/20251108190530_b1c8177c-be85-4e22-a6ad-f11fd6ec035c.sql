-- Drop the public select policy that exposes user data
DROP POLICY IF EXISTS "Allow public select" ON public.contact_submissions;

-- The "Allow public insert" policy stays so the edge function can record submissions
-- The edge function uses SUPABASE_SERVICE_ROLE_KEY which bypasses RLS for reads,
-- so it can still check rate limits without needing a select policy