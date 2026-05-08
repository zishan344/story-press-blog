"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  SessionProvider,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import { loginUser, registerUser, type User } from "../lib/api";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const userStorageKey = "storypress-user";
const tokenStorageKey = "storypress-token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthStateProvider>{children}</AuthStateProvider>
    </SessionProvider>
  );
}

function AuthStateProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const storedUser = window.localStorage.getItem(userStorageKey);
      const storedToken = window.localStorage.getItem(tokenStorageKey);

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser) as User);
        } catch {
          window.localStorage.removeItem(userStorageKey);
        }
      }

      setToken(storedToken);
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    queueMicrotask(() => {
      if (!session?.user) {
        if (user?.provider === "google") {
          setUser(null);
          setToken(null);
          window.localStorage.removeItem(userStorageKey);
          window.localStorage.removeItem(tokenStorageKey);
        }

        setIsReady(true);
        return;
      }

      const nextUser: User = {
        id: session.user.id,
        name: session.user.name ?? "Google User",
        email: session.user.email ?? "",
        image: session.user.image ?? undefined,
        provider: session.user.provider ?? "google",
      };
      const nextToken = session.idToken ?? session.accessToken ?? null;

      setUser(nextUser);
      setToken(nextToken);
      window.localStorage.setItem(userStorageKey, JSON.stringify(nextUser));

      if (nextToken) {
        window.localStorage.setItem(tokenStorageKey, nextToken);
      } else {
        window.localStorage.removeItem(tokenStorageKey);
      }

      setIsReady(true);
    });
  }, [session, status, user?.provider]);

  const persistSession = (nextUser: User, nextToken: string) => {
    setUser(nextUser);
    setToken(nextToken);
    window.localStorage.setItem(userStorageKey, JSON.stringify(nextUser));
    window.localStorage.setItem(tokenStorageKey, nextToken);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isReady,
      login: async (email: string, password: string) => {
        const data = await loginUser({ email, password });
        persistSession(data.user, data.token);
      },
      register: async (name: string, email: string, password: string) => {
        const data = await registerUser({ name, email, password });
        persistSession(data.user, data.token);
      },
      loginWithGoogle: async () => {
        const nextUrl =
          new URL(window.location.href).searchParams.get("next") || "/";

        await signIn("google", { redirectTo: nextUrl });
      },
      logout: () => {
        setUser(null);
        setToken(null);
        window.localStorage.removeItem(userStorageKey);
        window.localStorage.removeItem(tokenStorageKey);
        void signOut({ redirect: false });
      },
    }),
    [isReady, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
