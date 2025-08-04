export function buildLoginUrl({
    telegramUserId,
    username,
    address,
    signature,
    redirectPath = '/dashboard'
  }: {
    telegramUserId: string;
    username: string;
    address: string;
    signature: string;
    redirectPath?: string;
  }): string {
    const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
    const baseUrl = isLocalhost
      ? 'http://localhost:3000'
      : 'https://solana-bundler.vercel.app';
  
    const redirectPayload = {
      redirectUrl: redirectPath,
    };
  
    const redirectEncoded = btoa(JSON.stringify(redirectPayload));
  
    const params = new URLSearchParams({
      telegramUserId,
      username,
      address,
      signature,
      redirectUrl: redirectEncoded,
    });
  
    return `${baseUrl}/api/auth/login?${params.toString()}`;
  }
  