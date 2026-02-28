"use client";

import { useState, useActionState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react"; // ArrowLeft যোগ করা হয়েছে
import { useFormStatus } from "react-dom";
import { register } from "@/app/actions/auth";
import Link from "next/link"; // Link ইমপোর্ট করা হয়েছে

// ১. টাইপ ডিফাইন করা
interface RegisterState {
  error?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
  success?: boolean;
}

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative flex w-full justify-center rounded-lg bg-gradient-to-r from-amber-600 to-yellow-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:from-amber-700 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 disabled:opacity-50 active:scale-[0.98]"
    >
      {pending ? "Creating account..." : "Create account"}
    </button>
  );
}

export default function RegisterPage() {
  const [state, dispatch] = useActionState<RegisterState | any, FormData>(register, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-950 dark:via-amber-950 dark:to-yellow-950">
      {/* Background Decorative Circles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(245,158,11,0.08)_0%,transparent_25%),radial-gradient(circle_at_85%_30%,rgba(217,119,6,0.07)_0%,transparent_35%)]" />

      {/* --- Back to Home Button --- */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white/50 backdrop-blur-md border border-white/20 rounded-full shadow-sm hover:bg-white hover:text-amber-600 transition-all duration-300 dark:bg-gray-900/40 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-amber-400"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-5 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-10 rounded-2xl bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:bg-gray-900/70 border border-white/30 dark:border-gray-700/40 transition-all duration-500 hover:shadow-3xl hover:scale-[1.005]">
          
          <div className="text-center">
            <div className="mx-auto h-14 w-14 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 p-0.5 shadow-lg">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-white dark:bg-gray-900 text-2xl font-bold text-amber-600 dark:text-amber-400">
              B
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Join BEMEN today
            </p>
          </div>

          <form action={dispatch} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    required
                    className="block w-full rounded-lg border border-gray-300 bg-white/60 pl-11 py-3 text-gray-900 focus:ring-amber-500 focus:border-amber-500 outline-none dark:bg-gray-800/60 dark:text-white sm:text-sm transition-all"
                    placeholder="Full name"
                  />
                </div>
                {state?.error?.name && <p className="mt-1 text-xs text-red-500">{state.error.name[0]}</p>}
              </div>

              {/* Email */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-lg border border-gray-300 bg-white/60 pl-11 py-3 text-gray-900 focus:ring-amber-500 focus:border-amber-500 outline-none dark:bg-gray-800/60 dark:text-white sm:text-sm transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                {state?.error?.email && <p className="mt-1 text-xs text-red-500">{state.error.email[0]}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full rounded-lg border border-gray-300 bg-white/60 pl-11 py-3 text-gray-900 focus:ring-amber-500 focus:border-amber-500 outline-none dark:bg-gray-800/60 dark:text-white sm:text-sm transition-all"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-amber-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {state?.error?.password && <p className="mt-1 text-xs text-red-500">{state.error.password[0]}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    className="block w-full rounded-lg border border-gray-300 bg-white/60 pl-11 py-3 text-gray-900 focus:ring-amber-500 focus:border-amber-500 outline-none dark:bg-gray-800/60 dark:text-white sm:text-sm transition-all"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-amber-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {state?.error?.confirmPassword && <p className="mt-1 text-xs text-red-500">{state.error.confirmPassword[0]}</p>}
              </div>
            </div>

            {state?.message && <p className="text-sm text-center text-red-500 font-medium">{state.message}</p>}

            <RegisterButton />
          </form>

          <p className="mt-10 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-amber-600 hover:text-amber-500 transition-colors">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}