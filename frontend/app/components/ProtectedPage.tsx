"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export function ProtectedPage({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isReady } = useAuth();

  if (!isReady) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-52 animate-pulse rounded-md bg-slate-200" />
      </div>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="rounded-md border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-800">
            Protected page
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950">
            Login is required
          </h1>
          <p className="mt-4 text-slate-600">
            Please log in before opening {pathname}. After login, you can use
            the protected blog tools.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-emerald-800 px-6 text-sm font-bold text-white hover:bg-emerald-900"
          >
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
