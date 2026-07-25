"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Microscope, ShieldCheck, Sparkles } from "lucide-react";

// ─── Demo credentials (for placeholder — replace with NextAuth in Step 5) ─────
const DEMO_EMAIL    = "kalidas@iittp.ac.in";
const DEMO_PASSWORD = "vtl@admin2024";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [showPass,  setShowPass]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);
  const [success,   setSuccess]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200));

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setSuccess(true);
      // Store a simple session flag (NextAuth will replace this)
      sessionStorage.setItem("vtl_admin_auth", "true");
      setTimeout(() => router.push("/admin/dashboard"), 800);
    } else {
      setError("Invalid credentials. Please check your email and password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* ── Animated background ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-[#0d1535] to-[#060d1f]" />

      {/* Pulsing orbs */}
      {[
        { size: 600, x: "20%",  y: "10%",  color: "rgba(48,104,245,0.12)",  dur: 8 },
        { size: 500, x: "70%",  y: "60%",  color: "rgba(23,163,173,0.08)",  dur: 11 },
        { size: 400, x: "40%",  y: "80%",  color: "rgba(245,158,11,0.06)",  dur: 9 },
        { size: 300, x: "80%",  y: "5%",   color: "rgba(139,92,246,0.07)",  dur: 13 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y, background: orb.color, filter: "blur(80px)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
        />
      ))}

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      {/* ── Login card ───────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="glass-strong border border-white/12 rounded-3xl overflow-hidden shadow-glass-lg">
          {/* Header gradient bar */}
          <div className="h-1.5 bg-gradient-to-r from-brand-500 via-teal-500 to-brand-600" />

          <div className="px-8 pt-8 pb-10 space-y-7">
            {/* Logo + brand */}
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="relative mx-auto w-16 h-16"
              >
                <div className="w-16 h-16 rounded-2xl glass-brand flex items-center justify-center shadow-brand-md">
                  <Microscope className="w-8 h-8 text-brand-300" />
                </div>
                {/* Animated ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-brand-500/40"
                  animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              <div>
                <h1 className="text-2xl font-display font-bold text-white">Admin Portal</h1>
                <p className="text-sm text-slate-400 mt-1">Vision Technology Lab · IIT Tirupati</p>
              </div>

              <div className="inline-flex items-center gap-2 badge-brand text-xs px-3 py-1">
                <ShieldCheck className="w-3 h-3" />
                Secure Private Access
              </div>
            </div>

            {/* ── Form ──────────────────────────────────────────────────────── */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="admin-email" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="kalidas@iittp.ac.in"
                    className="input-glass w-full py-3 px-4 text-sm"
                    aria-describedby={error ? "login-error" : undefined}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="admin-password" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="input-glass w-full py-3 pl-4 pr-12 text-sm"
                    aria-describedby={error ? "login-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <motion.div
                  id="login-error"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="flex items-start gap-2.5 bg-red-500/12 border border-red-500/25 rounded-xl px-4 py-3 text-sm text-red-300"
                >
                  <Lock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {error}
                </motion.div>
              )}

              {/* Success state */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2.5 bg-teal-500/12 border border-teal-500/25 rounded-xl px-4 py-3 text-sm text-teal-300"
                >
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  Authenticated! Redirecting to dashboard…
                </motion.div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading || success}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading || success
                    ? "bg-brand-700/40 text-brand-400 cursor-not-allowed"
                    : "bg-brand-600 hover:bg-brand-500 text-white shadow-brand-sm hover:shadow-brand-md"
                }`}
                id="authenticate-btn"
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 rounded-full border-2 border-brand-300/40 border-t-brand-300"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                    Authenticating…
                  </>
                ) : success ? (
                  <><ShieldCheck className="w-4 h-4" /> Authenticated</>
                ) : (
                  <><Lock className="w-4 h-4" /> Authenticate</>
                )}
              </motion.button>
            </form>

            {/* Hint for demo */}
            <div className="text-center">
              <p className="text-[11px] text-slate-600">
                Demo: <code className="text-slate-500">{DEMO_EMAIL}</code> /{" "}
                <code className="text-slate-500">vtl@admin2024</code>
              </p>
            </div>
          </div>
        </div>

        {/* Below card note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-slate-600 mt-5"
        >
          Restricted access — for authorized lab administrators only.
          <br />
          Contact{" "}
          <a href="mailto:vtl@iittp.ac.in" className="text-brand-500 hover:text-brand-400 transition-colors">
            vtl@iittp.ac.in
          </a>{" "}
          for access requests.
        </motion.p>
      </motion.div>
    </div>
  );
}
