import { useState } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function Admin() {
  const { session } = useAuth();
  const { users, loading, checkingAdmin, isSuperAdmin, updatePassword, updateRole } = useAdmin();
  const [resetUserId, setResetUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [resetting, setResetting] = useState(false);

  if (!session) return <Navigate to="/auth" replace />;
  if (checkingAdmin) return <div className="flex items-center justify-center min-h-screen text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  if (!isSuperAdmin) return <Navigate to="/" replace />;

  const handleResetPassword = async () => {
    if (!resetUserId || !newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setResetting(true);
    try {
      await updatePassword(resetUserId, newPassword);
      toast.success("Password updated");
      setResetUserId(null);
      setNewPassword("");
    } catch {
      toast.error("Failed to update password");
    } finally {
      setResetting(false);
    }
  };

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      await updateRole(userId, role);
      toast.success("Role updated");
    } catch {
      toast.error("Failed to update role");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border px-4 py-3 flex items-center gap-3">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-lg font-bold text-foreground">Admin Dashboard</h1>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-foreground">Users ({users.length})</h2>
            <div className="border border-border rounded-md overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left px-4 py-2 text-muted-foreground font-medium">Email</th>
                    <th className="text-left px-4 py-2 text-muted-foreground font-medium">Verified</th>
                    <th className="text-left px-4 py-2 text-muted-foreground font-medium">Role</th>
                    <th className="text-left px-4 py-2 text-muted-foreground font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-2 text-foreground">{user.email}</td>
                      <td className="px-4 py-2">
                        <span className={user.email_confirmed_at ? "text-green-600" : "text-muted-foreground"}>
                          {user.email_confirmed_at ? "✓" : "✗"}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <select
                          value={user.role || "user"}
                          onChange={e => handleRoleChange(user.id, e.target.value)}
                          className="text-xs rounded border border-input bg-background px-2 py-1 text-foreground"
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                          <option value="super_admin">super_admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => setResetUserId(user.id)}
                          className="text-xs text-primary hover:underline"
                        >
                          Reset password
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {resetUserId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card rounded-lg p-6 w-full max-w-sm space-y-4">
              <h3 className="text-foreground font-medium">Reset Password</h3>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="New password (min 6 characters)"
                minLength={6}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => { setResetUserId(null); setNewPassword(""); }}
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetPassword}
                  disabled={resetting}
                  className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                >
                  {resetting ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
