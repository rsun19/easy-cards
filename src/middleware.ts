import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'
import { cookies } from 'next/headers'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function middleware (request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/token/request')) {
    const session = await auth()
    if (session?.user?.email != null) {
      try {
        const response = await fetch('http://localhost:9000/auth/token/request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: session.user.email
          })
        })
        if (response.ok) {
          const textResponse = await response.text()
          console.log(textResponse)
          /*
          "hacky solution", using redirect...
          https://github.com/vercel/next.js/issues/49442
          */
          const responseUrl = NextResponse.redirect(request.url)
          responseUrl.cookies.set('session', textResponse, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7 * 4, // One month
            path: '/'
          })
          return NextResponse.redirect(new URL('/', request.url))
        } else {
          console.log('failure')
          console.log(response)
        }
      } catch (e) {
        console.log(e)
        // return NextResponse.redirect(new URL('/login', request.url))
      }
    }
  }
}
