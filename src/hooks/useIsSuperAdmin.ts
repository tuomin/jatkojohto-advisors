import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export function useIsSuperAdmin() {
  const { session, loading: authLoading } = useAuth();
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkRole = async () => {
      if (authLoading) return;

      if (!session?.user?.id) {
        if (!isMounted) return;
        setIsSuperAdmin(false);
        setCheckingAdmin(false);
        return;
      }

      setCheckingAdmin(true);
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "super_admin",
      });

      if (!isMounted) return;
      setIsSuperAdmin(!error && !!data);
      setCheckingAdmin(false);
    };

    checkRole();

    return () => {
      isMounted = false;
    };
  }, [authLoading, session?.user?.id]);

  return { isSuperAdmin, checkingAdmin };
}
