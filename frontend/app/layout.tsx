import type { Metadata } from "next";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "StoryPress Blog",
  description: "A polished blog platform for essays, guides, and ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body
        className="min-h-full bg-stone-50 text-slate-950"
        suppressHydrationWarning
      >
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
