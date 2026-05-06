"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  ["Home", "/"],
  ["Blogs", "/blogs"],
  ["Categories", "/blogs"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-800 text-lg font-black text-white">
            S
          </span>
          <span className="text-xl font-black text-slate-950">StoryPress</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map(([label, href]) => {
            const active = href === "/" ? pathname === href : pathname.startsWith(href);

            return (
              <Link
                href={href}
                key={label}
                className={`rounded-md px-3 py-2 text-sm font-bold ${
                  active
                    ? "bg-emerald-50 text-emerald-900"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserOpen((open) => !open)}
                className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-left hover:border-emerald-300"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-sm font-black text-amber-900">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span>
                  <span className="block text-sm font-bold text-slate-950">{user.name}</span>
                  <span className="block text-xs text-slate-500">{user.email}</span>
                </span>
              </button>
              {userOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-md border border-slate-200 bg-white p-2 shadow-xl">
                  <Link className="block rounded-md px-3 py-2 text-sm font-semibold hover:bg-slate-100" href="/add-blog">
                    Add Blog
                  </Link>
                  <Link className="block rounded-md px-3 py-2 text-sm font-semibold hover:bg-slate-100" href="/manage-blogs">
                    Manage Blogs
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-rose-700 hover:bg-rose-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="rounded-md px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">
                Login
              </Link>
              <Link href="/register" className="rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-800">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-md border border-slate-200 px-3 py-2 text-sm font-bold lg:hidden"
        >
          Menu
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {navLinks.map(([label, href]) => (
              <Link
                href={href}
                key={label}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="mt-4 grid gap-2 border-t border-slate-200 pt-4">
            {user ? (
              <>
                <div className="rounded-md bg-slate-50 p-3">
                  <p className="font-bold text-slate-950">{user.name}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
                <Link href="/add-blog" className="rounded-md px-3 py-3 text-sm font-bold hover:bg-slate-100">
                  Add Blog
                </Link>
                <Link href="/manage-blogs" className="rounded-md px-3 py-3 text-sm font-bold hover:bg-slate-100">
                  Manage Blogs
                </Link>
                <button type="button" onClick={logout} className="rounded-md px-3 py-3 text-left text-sm font-bold text-rose-700 hover:bg-rose-50">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="rounded-md px-3 py-3 text-sm font-bold hover:bg-slate-100">
                  Login
                </Link>
                <Link href="/register" className="rounded-md bg-slate-950 px-3 py-3 text-center text-sm font-bold text-white">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
