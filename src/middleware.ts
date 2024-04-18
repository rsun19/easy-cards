import { type NextRequest, NextResponse } from 'next/server'

export async function middleware (request: NextRequest): Promise<NextResponse> {
  if (request.cookies.has('session')) {
    const cookie = request.cookies.get('session')
    if (cookie !== null && cookie !== undefined) {
      const sessionMap = JSON.parse(cookie.value)
      if (sessionMap.refreshTokenExpires >= Math.floor(Date.now() / 1000)) {
        NextResponse.redirect(new URL('/api/signout', request.url))
      }
    }
  }
  const cookie = request.cookies.get('session')
  console.log(cookie)
  return NextResponse.next()
}
