import { signOut } from '../../../auth'
import { type NextRequest } from 'next/server'

export async function GET (request: NextRequest): Promise<void> {
  await signOut()
}
