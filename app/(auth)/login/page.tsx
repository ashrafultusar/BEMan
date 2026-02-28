"use client";
import { authenticate } from "@/app/actions/auth";
import { Mail, Lock, ArrowLeft } from "lucide-react"; // ArrowLeft add kora hoyeche
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link"; // Next.js Link import

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative flex w-full justify-center rounded-lg bg-gradient-to-r from-amber-600 to-yellow-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:from-amber-700 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-300 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Signing in..." : "Sign in"}
    </button>
  );
}

export default function LoginPage() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-950 dark:via-amber-950 dark:to-yellow-950">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(245,158,11,0.08)_0%,transparent_25%),radial-gradient(circle_at_85%_30%,rgba(217,119,6,0.07)_0%,transparent_35%)] dark:bg-[radial-gradient(circle_at_15%_50%,rgba(245,158,11,0.12)_0%,transparent_25%),radial-gradient(circle_at_85%_30%,rgba(217,119,6,0.11)_0%,transparent_35%)]" />

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
        <div className="w-full max-w-md space-y-10 rounded-2xl bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:bg-gray-900/70 dark:shadow-amber-950/30 sm:p-10 border border-white/30 dark:border-gray-700/40 transition-all duration-500 hover:shadow-3xl hover:scale-[1.005]">
          
          <div className="text-center">
            <div className="mx-auto h-14 w-14 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 p-0.5 shadow-lg">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-white dark:bg-gray-900 text-2xl font-bold text-amber-600 dark:text-amber-400">
                B
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to continue
            </p>
          </div>

          <form action={dispatch} className="mt-8 space-y-6">
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-lg border border-gray-300 bg-white/60 pl-11 py-3 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-800/60 dark:text-white sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full rounded-lg border border-gray-300 bg-white/60 pl-11 py-3 text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-800/60 dark:text-white sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex h-5 items-end space-x-1">
              {errorMessage && (
                <p className="text-sm font-medium text-red-500">{errorMessage}</p>
              )}
            </div>

            <LoginButton />
          </form>

          <p className="mt-10 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-amber-600 hover:text-amber-500 transition-colors">
              Create one now →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}