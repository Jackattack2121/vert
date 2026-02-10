import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n';

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always', // Always use locale prefix (e.g., /en/, /de/)
});

// Admin auth middleware
const authMiddleware = withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token && token.role === 'admin';
      },
    },
    pages: {
      signIn: '/admin/login',
    },
  }
);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin routes (no locale prefix) - use auth middleware
  if (
    pathname.startsWith('/admin/(dashboard)') ||
    pathname.startsWith('/api/admin')
  ) {
    // @ts-ignore - withAuth has complex typing
    const response = await authMiddleware(req);
    if (response instanceof NextResponse || response instanceof Response) {
      response.headers.set('x-pathname', pathname);
    }
    return response;
  }

  // Portal routes (no locale prefix) - protected but handled differently
  if (pathname.startsWith('/portal/investor') || pathname.startsWith('/portal/institutional')) {
    // Portal routes are protected by layout-level auth checks
    // Allow through to the route, which will handle authorization
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    return response;
  }

  // API routes (no locale prefix) - allow through
  if (pathname.startsWith('/api')) {
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);
    return response;
  }

  // Static files and Next.js internals - allow through
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('/public/') ||
    /\.(jpg|jpeg|png|gif|svg|ico|webp|mp4|webm|css|js)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // All other routes - use intl middleware for locale routing
  const response = await intlMiddleware(req);
  // Add pathname header for locale detection in root layout
  response.headers.set('x-pathname', pathname);
  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - api routes (handled separately above)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

