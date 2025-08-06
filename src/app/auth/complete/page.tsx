// src/app/auth/complete/page.tsx
'use client';

import { Suspense } from 'react';
import AuthCompleteClient from './AuthCompleteClient';

export default function AuthCompletePage() {
  return (
    <Suspense fallback={<div>Finalizing login...</div>}>
      <AuthCompleteClient />
    </Suspense>
  );
}
