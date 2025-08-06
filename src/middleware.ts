import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/bundle',
  '/liquidity',
  '/manage-wallets',
  '/activity',
  '/wallet',
  '/token',
  '/projects'
];

const publicAuthRoutes = ['/login', '/auth/complete'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicAuthRoute = publicAuthRoutes.some(route => pathname.startsWith(route));

  // ✅ Allow all public auth routes immediately
  if (isPublicAuthRoute) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get('telegram-auth-storage');
  let isAuthenticated = false;

  if (authCookie) {
    try {
      const parsed = JSON.parse(authCookie.value);
      isAuthenticated = parsed?.state?.isAuthenticated === true;
    } catch (err) {
      console.warn('⚠️ Invalid auth cookie:', err);
    }
  }

  // ✅ If visiting a protected route without auth → redirect to login
  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};