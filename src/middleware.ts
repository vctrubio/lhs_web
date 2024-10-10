import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import path from 'path';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname is exactly '/propiedades'
  if (pathname === '/propiedades' || pathname === '/propiedades/') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow the request to proceed if no redirection is needed
  return NextResponse.next();
}

// Specify the paths that the middleware should run on
export const config = {
  matcher: ['/propiedades'],
};