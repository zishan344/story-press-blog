'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter();
  const { login, register, loginWithGoogle } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isRegister = mode === 'register';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (isRegister && !name.trim()) {
      setError('Name is required.');
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }

      const nextUrl =
        new URL(window.location.href).searchParams.get('next') || '/';
      router.push(nextUrl);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ?
          caughtError.message
        : 'Authentication failed. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      const nextUrl =
        new URL(window.location.href).searchParams.get('next') || '/';
      router.push(nextUrl);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-md border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-800">
          {isRegister ? 'Create account' : 'Welcome back'}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">
          {isRegister ? 'Register for StoryPress' : 'Login to StoryPress'}
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {isRegister ?
            'Create a writer profile to open protected blog tools.'
          : 'Use credentials or Google to continue to the blog dashboard.'}
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={loading}
        className="mt-6 flex h-12 w-full items-center justify-center rounded-md border border-slate-300 bg-white text-sm font-bold text-slate-900 hover:border-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        Continue with Google
      </button>

      <div className="my-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        or
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {isRegister && (
          <label>
            <span className="mb-2 block text-sm font-bold text-slate-700">
              Name
            </span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-12 w-full rounded-md border border-slate-300 px-4 text-sm"
              placeholder="Your name"
            />
          </label>
        )}
        <label>
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Email
          </span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-sm"
            placeholder="you@example.com"
          />
        </label>
        <label>
          <span className="mb-2 block text-sm font-bold text-slate-700">
            Password
          </span>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-sm"
            placeholder="At least 6 characters"
          />
        </label>

        {error && (
          <p className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="h-12 rounded-md bg-emerald-800 px-5 text-sm font-bold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ?
            'Please wait...'
          : isRegister ?
            'Create Account'
          : 'Login'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        {isRegister ? 'Already have an account?' : 'New to StoryPress?'}{' '}
        <Link
          href={isRegister ? '/login' : '/register'}
          className="font-bold text-emerald-800 hover:text-emerald-950"
        >
          {isRegister ? 'Login' : 'Register'}
        </Link>
      </p>
    </div>
  );
}
