import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const isPublic = ['/login', '/'].includes(url.pathname);
  const token = req.cookies.get('access_token')?.value;
  const role = req.cookies.get('user_role')?.value;

  if (!isPublic && !token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (role === 'student' && url.pathname.startsWith('/users')) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
