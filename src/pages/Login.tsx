import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Account created! You can now sign in.");
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-foreground/95 p-10 shadow-2xl border border-primary/30">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4">
          <span className="font-display text-primary-foreground text-2xl font-bold">VVG</span>
        </div>
        <h1 className="font-display text-2xl text-center text-secondary font-bold mb-1">
          Victory Vocals Ghana
        </h1>
        <p className="text-center text-muted-foreground text-sm tracking-widest uppercase mb-8">
          Attendance Management System
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <Label className="text-secondary font-bold text-sm">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@victoryvocals.com"
              required
              className="bg-background/10 border-primary/25 text-secondary"
            />
          </div>
          <div>
            <Label className="text-secondary font-bold text-sm">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="bg-background/10 border-primary/25 text-secondary"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold py-3"
          >
            {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In →"}
          </Button>
        </form>

        <p className="text-center text-sm mt-6 text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary font-bold hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
