"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Globe, Mail, Lock, User, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-background relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />

      {/* Right Side: Branding (Desktop) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative z-10 bg-secondary/5 border-r border-border order-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Afconomy" width={160} height={40} className="h-10 w-auto" />
        </Link>
        
        <div className="space-y-6">
          <div className="p-3 bg-emerald-500/10 rounded-2xl w-fit">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
          </div>
          <h1 className="text-5xl font-extrabold text-foreground leading-tight">
            Join the <br />
            <span className="text-primary">Intelligence Network</span>
          </h1>
          <p className="text-xl text-secondary max-w-md leading-relaxed">
            Create your institutional account to bookmark research, participate in live polls, and access deeper metrics.
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-secondary">
          <span>Institutional Access</span>
          <div className="h-1 w-1 rounded-full bg-border" />
          <span>Priority Support</span>
        </div>
      </div>

      {/* Left Side: Register Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 relative z-10 order-1">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-foreground">Create Account</h2>
            <p className="text-secondary font-medium">Connect to the continental data engine</p>
          </div>

          {isSuccess ? (
            <div className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-4 animate-in zoom-in-95 duration-300">
              <div className="mx-auto h-12 w-12 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">Registration Complete!</h3>
                <p className="text-sm text-secondary">Redirecting to login portal...</p>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary uppercase tracking-widest pl-1 font-mono">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary/50" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="John Doe"
                        className="w-full bg-secondary/5 border border-border rounded-xl h-12 pl-12 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-secondary/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary uppercase tracking-widest pl-1 font-mono">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary/50" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="name@company.com"
                        className="w-full bg-secondary/5 border border-border rounded-xl h-12 pl-12 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-secondary/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-secondary uppercase tracking-widest pl-1 font-mono">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary/50" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder="••••••••"
                          className="w-full bg-secondary/5 border border-border rounded-xl h-12 pl-12 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-secondary/30"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-secondary uppercase tracking-widest pl-1 font-mono">
                        Confirm
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary/50" />
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          placeholder="••••••••"
                          className="w-full bg-secondary/5 border border-border rounded-xl h-12 pl-12 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-secondary/30"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Register Account <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="text-center">
                <p className="text-sm text-secondary font-medium">
                  Already a member?{" "}
                  <Link href="/login" className="text-primary font-bold hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
