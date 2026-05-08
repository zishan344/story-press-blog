"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export function ProtectedPage({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isReady } = useAuth();

  useEffect(() => {
    if (isReady && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isReady, pathname, router, user]);

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
            Redirecting you to login before opening {pathname}.
          </p>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
