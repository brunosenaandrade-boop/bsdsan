import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Redireciona para /bsdsan quando acessar a raiz nos domínios BSDSAN
  if (pathname === '/' && (host.includes('bsdsan.vercel.app') || host.includes('bsdsan.bsdeveloper.com.br'))) {
    return NextResponse.redirect(new URL('/bsdsan', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
