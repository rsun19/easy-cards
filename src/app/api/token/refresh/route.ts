import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '../../../../auth'
import { getRefreshToken } from '../../../lib/getRefreshToken'
import { cookies } from 'next/headers'

export async function GET (request: NextRequest): Promise<NextResponse> {
  const session = await auth()
  if (session?.user?.email != null) {
    try {
      const response = await getRefreshToken(session?.user?.email)
      if (response.ok) {
        const textResponse = await response.text()
        console.log(textResponse)
        cookies().set({
          name: 'session',
          value: textResponse,
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7 * 4, // One month
          path: '/'
        })
        return NextResponse.redirect(new URL('/', request.url))
      } else {
        return NextResponse.redirect(new URL('/token/request/failure', request.url))
      }
    } catch (e) {
      return NextResponse.redirect(new URL('/token/request/failure', request.url))
    }
  }
  return NextResponse.redirect(new URL('/login/failure', request.url))
}
