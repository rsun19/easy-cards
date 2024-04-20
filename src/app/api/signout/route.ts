import { signOut } from '../../../auth'
import { type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function GET (request: NextRequest): Promise<void> {
  if (cookies().has('session')) {
    cookies().delete('session')
  }
  await signOut()
}
