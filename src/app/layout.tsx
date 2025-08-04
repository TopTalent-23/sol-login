import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "@/components/ui/Toast";
import { useEffect, useState } from "react";
import Link from "next/link";
import UserHeader from '@/components/UserHeader';

export const metadata: Metadata = {
  title: "Solana Bundler - Bundle Your Transactions Like a Pro",
  description: "Save money, trade safely, and execute multiple Solana transactions at once with our user-friendly bundler platform.",
  keywords: "Solana, bundler, DeFi, transactions, crypto, blockchain",
  openGraph: {
    title: "Solana Bundler - Bundle Your Transactions Like a Pro",
    description: "Save money, trade safely, and execute multiple Solana transactions at once",
    type: "website",
    url: "https://solanabundler.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Solana Bundler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solana Bundler",
    description: "Bundle Your Solana Transactions Like a Pro",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, []);

  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-gray-900 text-white flex justify-between items-center">
          <h1 className="text-lg font-bold">Solana Bundler</h1>
          {/* <div>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">Logged in as <strong>@{user.username}</strong></span>
                <Link href="/api/auth/logout" className="text-red-400 hover:underline">Logout</Link>
              </div>
            ) : (
              <Link href="/auth/telegram" className="text-blue-400 hover:underline">Login with Telegram</Link>
            )}
          </div> */}
          <UserHeader />
        </header>
        <main>{children}</main>
        <ToastContainer />
      </body>
    </html>
  );
}
