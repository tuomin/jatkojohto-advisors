
-- Drop all existing restrictive policies on user_roles
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Deny anonymous access to user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Super admins can update roles" ON public.user_roles;

-- Recreate as PERMISSIVE policies on user_roles
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Super admins can insert roles"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can update roles"
  ON public.user_roles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can delete roles"
  ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'::app_role));

-- Drop all existing restrictive policies on advisor_usage
DROP POLICY IF EXISTS "Users can create own usage record" ON public.advisor_usage;
DROP POLICY IF EXISTS "Users can update own usage record" ON public.advisor_usage;
DROP POLICY IF EXISTS "Users can view their own usage" ON public.advisor_usage;
DROP POLICY IF EXISTS "Users cannot delete usage record" ON public.advisor_usage;

-- Recreate as PERMISSIVE policies on advisor_usage (scoped to authenticated)
CREATE POLICY "Users can view their own usage"
  ON public.advisor_usage FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own usage record"
  ON public.advisor_usage FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own usage record"
  ON public.advisor_usage FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
