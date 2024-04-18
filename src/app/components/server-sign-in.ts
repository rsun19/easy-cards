'use server'
import { signIn } from '../../auth'

export default async function serverSignIn (): Promise<void> {
  await signIn('google', { callbackUrl: '/api/token/request' })
}
