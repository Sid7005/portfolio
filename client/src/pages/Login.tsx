import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";

const Login = () => {
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Invalid password.");
        return;
      }
      setLocation("/admin");
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center grid-bg px-4">
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full animate-pulse-glow"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full animate-pulse-glow"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)", animationDelay: "2s" }}
        />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card rounded-3xl p-8 border border-white/10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center glow-sm-violet">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold gradient-text mb-1">Admin Access</h1>
            <p className="text-sm text-muted-foreground">Enter your password to manage portfolio content</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full gradient-bg text-white rounded-xl py-3 font-semibold hover:opacity-90 hover:shadow-lg hover:shadow-violet-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
        </div>

        <p className="text-center mt-4">
          <a href="/" className="text-sm text-muted-foreground hover:text-white transition">
            ← Back to Portfolio
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
