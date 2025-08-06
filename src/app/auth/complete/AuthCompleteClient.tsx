// src/app/auth/complete/AuthCompleteClient.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AuthCompleteClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      Cookies.set(
        'telegram-auth-storage',
        JSON.stringify({
          state: { isAuthenticated: true },
          token,
        }),
        {
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
          expires: 7,
        }
      );
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Processing login...</p>
    </div>
  );
}
