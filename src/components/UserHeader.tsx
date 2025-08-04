'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UserHeader() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <div className="text-sm">
      {user ? (
        <div className="flex items-center gap-4">
          <span>Logged in as <strong>@{user.username}</strong></span>
          <Link href="/api/auth/logout" className="text-red-500 underline">Logout</Link>
        </div>
      ) : (
        <Link href="/auth/telegram" className="text-blue-400 underline">Login with Telegram</Link>
      )}
    </div>
  );
}
