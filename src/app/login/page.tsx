import Link from "next/link";
import {
  Lock,
  ShieldCheck,
  ArrowRightCircle,
  AlertCircle,
  CheckCircle2,
  UserPlus,
  LogIn,
  Database,
} from "lucide-react";
import { login, signup } from "./actions";
import { getSupabaseEnv } from "@/utils/supabase/config";

interface LoginPageProps {
  searchParams: Promise<{
    mode?: string;
    next?: string;
    error?: string;
    message?: string;
    setup?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const isSignup = params.mode === "signup";
  const nextPath = params.next || "/admin";
  const { isConfigured } = getSupabaseEnv();

  return (
    <div className="min-h-[80vh] bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Header Badge & Title */}
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-genix-navy text-amber-300 px-4 py-1 text-xs font-extrabold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SECURE AUTH</span>
          </span>
          <h1 className="font-heading text-3xl font-extrabold text-genix-navy">
            {isSignup ? "Create Staff Admin Account" : "Admin & Staff Sign-In"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Access the protected Genix Operations Dashboard to manage facility
            staffing requisitions, home care quotes, and clinical job applications.
          </p>
        </div>

        {/* Missing Env Setup Banner */}
        {(!isConfigured || params.setup === "missing_env") && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <Database className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Supabase Configuration Required</span>
            </div>
            <p className="leading-relaxed">
              Copy <code className="font-mono font-bold">.env.local.example</code> to{" "}
              <code className="font-mono font-bold">.env.local</code> and set{" "}
              <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="font-mono">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>,
              then run the SQL migration in{" "}
              <code className="font-mono">supabase/migrations/</code>.
            </p>
          </div>
        )}

        {/* Error Alert */}
        {params.error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3 text-xs text-red-800">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{params.error}</span>
          </div>
        )}

        {/* Success / Info Message */}
        {params.message && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{params.message}</span>
          </div>
        )}

        {/* Auth Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-200 space-y-6">
          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-xs font-bold">
            <Link
              href={`/login?next=${encodeURIComponent(nextPath)}`}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg transition-all ${
                !isSignup
                  ? "bg-genix-navy text-white shadow-sm"
                  : "text-slate-600 hover:text-genix-navy"
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
            <Link
              href={`/login?mode=signup&next=${encodeURIComponent(nextPath)}`}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg transition-all ${
                isSignup
                  ? "bg-genix-navy text-white shadow-sm"
                  : "text-slate-600 hover:text-genix-navy"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </Link>
          </div>

          <form action={isSignup ? signup : login} className="space-y-4">
            <input type="hidden" name="next" value={nextPath} />

            {isSignup && (
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-bold text-slate-700 mb-1"
                >
                  Full Name &amp; Title
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="e.g., Jamal, Director of Care Delivery"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Work Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="staff@genixmss.com"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-slate-700 mb-1"
              >
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignup ? "new-password" : "current-password"}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs focus:border-genix-navy focus:outline-none"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              <Lock className="w-4 h-4" />
              <span>
                {isSignup
                  ? "CREATE ADMIN ACCOUNT"
                  : "SIGN IN TO ADMIN DASHBOARD"}
              </span>
              <ArrowRightCircle className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Looking for the Family Care Portal?</span>
            <Link
              href="/portal"
              className="font-bold text-genix-crimson hover:underline"
            >
              Family Portal →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

