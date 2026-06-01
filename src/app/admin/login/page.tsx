"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] flex items-center justify-center p-6 text-[var(--foreground)] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-panel p-8 md:p-10 border border-[#D4AF37]/20 relative z-10"
      >
        <div className="text-center mb-10">
          <h1 className="font-cinzel text-3xl text-[#D4AF37] mb-2">Admin Portal</h1>
          <p className="font-space text-xs tracking-widest text-[var(--muted-text)] uppercase">Secure Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-500/50 text-red-200 text-sm font-space rounded-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block font-space text-xs tracking-widest text-[var(--muted-text)] uppercase mb-2">Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[var(--overlay-bg)] border border-[var(--border-color)] p-3 text-[var(--foreground)] font-poppins focus:outline-none focus:border-[#D4AF37]/50 transition-colors rounded-sm"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block font-space text-xs tracking-widest text-[var(--muted-text)] uppercase mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[var(--overlay-bg)] border border-[var(--border-color)] p-3 text-[var(--foreground)] font-poppins focus:outline-none focus:border-[#D4AF37]/50 transition-colors rounded-sm"
              placeholder="Enter password"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#D4AF37] text-black font-space text-xs tracking-[0.2em] uppercase hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
