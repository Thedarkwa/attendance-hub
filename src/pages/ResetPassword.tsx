import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import victoryLogo from "@/assets/victory_logo.jpeg";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase auto-exchanges the recovery token in the URL hash on load
    // and fires a PASSWORD_RECOVERY event.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setReady(true);
      }
    });
    // Also check current session in case the event already fired
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated. Please sign in.");
      await supabase.auth.signOut();
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md rounded-2xl bg-card p-10 shadow-lg border border-border">
        <img src={victoryLogo} alt="Victory Vocals Ghana" className="h-20 mx-auto mb-4 object-contain" />
        <h1 className="font-display text-2xl text-center text-foreground font-bold mb-1">
          Reset Password
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-8">
          {ready ? "Choose a new password for your account." : "Validating reset link..."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-foreground font-bold text-sm">New Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              minLength={6}
              className="bg-background border-border text-foreground"
            />
          </div>
          <div>
            <Label className="text-foreground font-bold text-sm">Confirm Password</Label>
            <Input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter new password"
              required
              minLength={6}
              className="bg-background border-border text-foreground"
            />
          </div>
          <Button
            type="submit"
            disabled={loading || !ready}
            className="w-full bg-primary text-primary-foreground font-bold py-3"
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
