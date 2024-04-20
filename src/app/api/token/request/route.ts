import { type NextRequest, NextResponse } from 'next/server'
import { getAccessToken } from '../../../lib/getAccessToken'
import { cookies } from 'next/headers'

export async function GET (request: NextRequest): Promise<NextResponse> {
  const cookieData = cookies()
  if (cookieData.has('session')) {
    try {
      const sessionData = cookieData.get('session')
      if (typeof sessionData !== 'undefined') {
        const response = await getAccessToken(sessionData.value)
        if (response.ok) {
          const textResponse = await response.text()
          console.log(textResponse)
          cookies().set({
            name: 'session',
            value: textResponse,
            httpOnly: true,
            maxAge: 60 * 30, // 30 minutes
            path: '/'
          })
          return NextResponse.redirect(new URL('/', request.url))
        } else if (response.status === 401) {
          NextResponse.redirect(new URL('/api/signout', request.url))
        }
      }
      return NextResponse.redirect(new URL('/token/request/failure', request.url))
    } catch (e) {
      return NextResponse.redirect(new URL('/token/request/failure', request.url))
    }
  }
  return NextResponse.redirect(new URL('/login/failure', request.url))
}
