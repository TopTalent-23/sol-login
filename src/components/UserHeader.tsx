'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function UserHeader() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    // Optional: call your backend logout route if needed
    await fetch('/api/auth/logout');

    // Clear the frontend auth cookie
    Cookies.remove('telegram-auth-storage', { path: '/' });

    // Redirect to login page
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
        <Link href="/auth/telegram" className="text-blue-400 underline">Login with Telegram</Link>
      )}
    </div>
  );
}
