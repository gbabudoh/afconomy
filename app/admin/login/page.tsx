"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Shield, Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.user.role === "ADMIN") {
          router.push("/admin");
        } else {
          setError("Access denied. You do not have administrator privileges.");
          // We should probably log them out or clear session if they aren't admin but somehow got here
        }
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm font-medium">Back to Platform</span>
      </Link>
      
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Terminal</h1>
          <p className="text-slate-500 text-sm text-center">
            Authorized access only. All activities are monitored.
          </p>
        </div>

        <div className="bg-[#DCDCDC] border border-slate-200 rounded-3xl p-8 shadow-xl">
          {error && (
            <div className="mb-6 p-4 bg-red-600 border border-red-600 rounded-xl text-white text-sm shadow-md animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 bg-white/50 border border-slate-300 rounded-xl pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all placeholder:text-slate-400"
                  placeholder="admin@afconomy.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 bg-white/50 border border-slate-300 rounded-xl pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all placeholder:text-slate-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(234,179,8,0.2)] active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Access Terminal"
              )}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Afconomy Intelligence Platform &copy; 2024 Admin Control
        </p>
      </div>
    </div>
  );
}
