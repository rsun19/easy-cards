import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './app/lib/auth'
import { type SessionProps } from './app/lib/sessionprops'
import axios from 'axios'
import { cookies } from 'next/headers'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function middleware (request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/token/request')) {
    const session: SessionProps | null = await getServerSession(authOptions)
    if (session?.user?.email != null) {
      try {
        await axios.post('http://localhost:9000/auth/token/request', {
          email: session.user.email
        })
          .then(function (response) {
            console.log(response)
            cookies().set('session', response.data as string, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 60 * 60 * 24 * 7 * 4, // One month
              path: '/'
            })
            return NextResponse.redirect(new URL('/', request.url))
          })
          .catch(function (error) {
            console.log(error)
          })
      } catch (e) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }
  }
}
