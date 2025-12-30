import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Verifica se é domínio BSDSAN
  const isBSDSAN = host.includes('bsdsan.vercel.app') || host.includes('bsdsan.bsdeveloper.com.br');

  if (isBSDSAN) {
    // Se acessar a raiz, redireciona para /bsdsan
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/bsdsan', request.url));
    }

    // Se acessar uma rota sem /bsdsan, redireciona para /bsdsan + rota
    // Ex: /credenciamento -> /bsdsan/credenciamento
    if (!pathname.startsWith('/bsdsan') && !pathname.startsWith('/_next') && !pathname.startsWith('/api') && !pathname.includes('.')) {
      return NextResponse.redirect(new URL(`/bsdsan${pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/credenciamento',
    '/acesso',
    '/sobre',
    '/comando/:path*',
    '/portal/:path*',
    '/documentos',
  ],
};
