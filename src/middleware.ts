import { type NextRequest, NextResponse } from 'next/server'

export async function middleware (request: NextRequest): Promise<NextResponse> {
  if (request.cookies.has('session') &&
      !request.nextUrl.pathname.startsWith('/api/signout')) {
    const cookie = request.cookies.get('session')
    if (cookie !== null && cookie !== undefined) {
      const sessionMap = JSON.parse(cookie.value)
      if (sessionMap.refreshTokenExpires <= Math.floor(Date.now() / 1000)) {
        return NextResponse.redirect(new URL('/api/signout', request.url))
      }
    }
  } else if (
    request.nextUrl.pathname.startsWith('/create') ||
    request.nextUrl.pathname.startsWith('/flashcard') ||
    request.nextUrl.pathname.startsWith('/account')) {
    return NextResponse.redirect(new URL('/api/login', request.url))
  }
  return NextResponse.next()
}
