import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import victoryLogo from "@/assets/victory_logo.jpeg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
      toast.success("Password reset email sent. Check your inbox.");
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
          Forgot Password
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-8">
          Enter your email and we'll send you a reset link.
        </p>

        {sent ? (
          <div className="space-y-4 text-center">
            <p className="text-foreground">
              If an account exists for <span className="font-bold">{email}</span>, a reset link has been sent.
            </p>
            <Link to="/login" className="text-primary font-bold hover:underline inline-block">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-foreground font-bold text-sm">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="bg-background border-border text-foreground"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-bold py-3"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
            <p className="text-center text-sm mt-4 text-muted-foreground">
              Remembered it?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
