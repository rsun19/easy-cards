'use server'

import React from 'react'
import Account from './account'
import { getUsername } from '../lib/getUsername'
import { cookies } from 'next/headers'
import { type RefreshTokenResponse } from '@/types'
import Navbar from '../components/navbar'

export default async function Page (): Promise<React.JSX.Element> {
  const cookie = cookies().get('session')?.value
  if (typeof cookie !== 'undefined') {
    const cookieData: RefreshTokenResponse = JSON.parse(cookie)
    const username = await getUsername(cookieData.accessToken)
    if (username !== null) {
      return (
        <>
          <Navbar />
          <Account accessToken={cookieData.accessToken} refreshToken={cookieData.refreshToken} username={username} />
        </>
      )
    }
  }

  return (
    <div>Access denied.</div>
  )
}
