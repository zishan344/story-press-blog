"use client";

import { createContext, useContext, useMemo, useState } from "react";

type User = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  isReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const storageKey = "storypress-user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const storedUser = window.localStorage.getItem(storageKey);
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  });

  const persistUser = (nextUser: User) => {
    setUser(nextUser);
    window.localStorage.setItem(storageKey, JSON.stringify(nextUser));
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isReady: true,
      login: async (email: string) => {
        persistUser({
          name: email.split("@")[0] || "StoryPress Writer",
          email,
        });
      },
      register: async (name: string, email: string) => {
        persistUser({ name, email });
      },
      loginWithGoogle: async () => {
        persistUser({
          name: "Google Writer",
          email: "writer@gmail.com",
        });
      },
      logout: () => {
        setUser(null);
        window.localStorage.removeItem(storageKey);
      },
    }),
    [user],
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
