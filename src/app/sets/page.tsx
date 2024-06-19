'use server'
import React from 'react'
import Navbar from '../components/navbar'
import { cookies } from 'next/headers'
import Set from './sets'
import { type RefreshTokenResponse } from '@/types'

const Page = async (): Promise<React.JSX.Element> => {
  const cookie = cookies().get('session')
  if (typeof cookie === 'undefined') {
    return (
      <>
        access denied.
      </>
    )
  }
  const cookieData: RefreshTokenResponse = JSON.parse(cookie.value)
  return (
    <>
      <Navbar />
      <br />
      <p className='text-center text-2xl'>Sets:</p>
      <br />
      <Set accessToken={cookieData.accessToken} refreshToken={cookieData.refreshToken} />
    </>
  )
}

export default Page
