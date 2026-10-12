import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2, Lock } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { signOut, useAdminAuth } from "../use-admin-auth";
import SetupNotice from "../SetupNotice";
import PageLoader from "@/components/PageLoader";

const Login = () => {
  const auth = useAdminAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!supabase) return <SetupNotice />;
  if (auth.status === "loading") return <PageLoader />;
  if (auth.status === "admin") {
    const from = (location.state as { from?: string } | null)?.from ?? "/admin";
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Helmet>
        <title>Admin sign in | Marrakech Discover</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <img src="/assets/logo.png" alt="Marrakech Discover" className="h-12" />
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
              Admin sign in
            </h1>
          </div>

          {auth.status === "not-admin" ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You're signed in as <strong className="text-foreground">{auth.session.user.email}</strong>,
                but this account doesn't have admin access.
              </p>
              <Button variant="outline" className="w-full" onClick={() => signOut()}>
                Sign out
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Sign in
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
