import type { Metadata } from 'next';
import './globals.css';
import { ToastContainer } from '@/components/ui/Toast';
import UserHeader from '@/components/UserHeader'; // client component, this is okay

export const metadata: Metadata = {
  title: 'Solana Bundler',
  description: 'Bundle your transactions like a pro',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 bg-gray-900 text-white flex justify-between items-center">
          <h1 className="text-lg font-bold">Solana Bundler</h1>
          <UserHeader />
        </header>
        <main>{children}</main>
        <ToastContainer />
      </body>
    </html>
  );
}
