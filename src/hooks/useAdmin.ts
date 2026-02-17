import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  email_confirmed_at: string | null;
  role: string;
}

export function useAdmin() {
  const { session } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const checkAdmin = useCallback(async () => {
    if (!session?.user?.id) return;
    const { data } = await supabase.rpc("has_role", {
      _user_id: session.user.id,
      _role: "super_admin",
    });
    setIsSuperAdmin(!!data);
  }, [session?.user?.id]);

  const fetchUsers = useCallback(async () => {
    if (!session?.access_token) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin", {
        body: { action: "list_users" },
      });
      if (error) throw error;
      setUsers(data?.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [session?.access_token]);

  const updatePassword = useCallback(async (userId: string, password: string) => {
    const { data, error } = await supabase.functions.invoke("admin", {
      body: { action: "update_password", userId, password },
    });
    if (error) throw error;
    return data;
  }, []);

  const updateRole = useCallback(async (userId: string, role: string) => {
    const { data, error } = await supabase.functions.invoke("admin", {
      body: { action: "update_role", userId, role },
    });
    if (error) throw error;
    await fetchUsers();
    return data;
  }, [fetchUsers]);

  useEffect(() => {
    checkAdmin();
  }, [checkAdmin]);

  useEffect(() => {
    if (isSuperAdmin) fetchUsers();
  }, [isSuperAdmin, fetchUsers]);

  return { users, loading, isSuperAdmin, updatePassword, updateRole, fetchUsers };
}
