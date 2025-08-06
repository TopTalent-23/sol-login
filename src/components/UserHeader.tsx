'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function UserHeader() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const raw = Cookies.get('telegram-auth-storage');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.state?.isAuthenticated) {
          setUser({ username: parsed?.username ?? 'unknown' }); // You can store & extract more fields
        }
      } catch (err) {
        console.warn('⚠️ Invalid auth cookie:', err);
      }
    }
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    Cookies.remove('telegram-auth-storage', { path: '/' });
    router.replace('/login');
  };

  return (
    <div className="text-sm">
      {user ? (
        <div className="flex items-center gap-4">
          <span>Logged in as <strong>@{user.username}</strong></span>
          <button onClick={handleLogout} className="text-red-500 underline">
            Logout
          </button>
        </div>
      ) : (
        <Link href="/auth/telegram" className="text-blue-400 underline">
          Login with Telegram
        </Link>
      )}
    </div>
  );
}
