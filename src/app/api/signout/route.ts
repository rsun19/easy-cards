import { signOut } from '../../../auth'
import { type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function GET (request: NextRequest): Promise<void> {
  const cookieData = cookies()
  if (cookieData.has('session')) {
    cookieData.delete('session')
  }
  await signOut()
}
