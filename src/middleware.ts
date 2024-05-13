import { type NextRequest, NextResponse } from 'next/server'
import { getAccessToken } from './app/lib/getAccessToken'

export async function middleware (request: NextRequest): Promise<NextResponse> {
  if (request.cookies.has('session') &&
      !request.nextUrl.pathname.startsWith('/api/signout')) {
    const cookie = request.cookies.get('session')
    if (cookie !== null && cookie !== undefined) {
      const sessionMap = JSON.parse(cookie.value)
      if (sessionMap.refreshTokenExpires <= Math.floor(Date.now() / 1000)) {
        return NextResponse.redirect(new URL('/api/signout', request.url))
      } else if (sessionMap.accessTokenExpires <= Math.floor(Date.now() / 1000) &&
                (request.nextUrl.pathname.startsWith('/create') ||
                request.nextUrl.pathname.startsWith('/flashcard') ||
                request.nextUrl.pathname.startsWith('/account'))) {
        console.log('refreshing...')
        /*
        "hacky solution", using redirect...
        https://github.com/vercel/next.js/issues/49442
        */
        const responseUrl = NextResponse.redirect(request.url)
        const response: Response = await getAccessToken(sessionMap.refreshToken as string)
        const responseText = await response.text()
        const responseTextJson = JSON.parse(responseText)
        sessionMap.accessToken = responseTextJson.accessToken
        sessionMap.accessTokenExpires = responseTextJson.accessTokenExpires
        responseUrl.cookies.set('session', JSON.stringify(sessionMap), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7 * 4, // One month
          path: '/'
        })
        return responseUrl
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
