import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
      const cookie = request.cookies.get('magic')?.value;

    if (
        request.nextUrl.pathname.startsWith('/_next') 
    ) {
        return NextResponse.next()
    }
  if (request.nextUrl.pathname.startsWith('/participant') && !cookie) {
    console.log('[MIDDLEWARE] Redirecting to /auth')
    return NextResponse.redirect(new URL('/auth', request.url))
  }
  cookie ? console.log('[MIDDLEWARE] Request is already on /participant') : console.log('[MIDDLEWARE] Request is already on /auth')
    return NextResponse.next()
}