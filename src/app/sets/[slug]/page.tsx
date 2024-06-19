'use server'
import React from 'react'
import Navbar from '../../components/navbar'
import { cookies } from 'next/headers'
import { getFlashcards } from '@/app/lib/getFlashcards'
import { type RefreshTokenResponse } from '@/types'

interface PageParams {
  params: {
    slug: string
  }
  searchParams: {
    username: string
  }
}

const Page = async ({ params, searchParams }: PageParams): Promise<React.JSX.Element> => {
  const cookie = cookies().get('session')
  if (typeof cookie === 'undefined') {
    return (
        <>
          access denied.
        </>
    )
  }
  const cookieData: RefreshTokenResponse = JSON.parse(cookie.value)

  const flashcards = await getFlashcards(cookieData.accessToken, cookieData.refreshToken, params.slug, searchParams.username)

  return (
      <>
        <Navbar />
        <div className='mt-3 text-center text-2xl'>
        {flashcards?.set.name}
        </div>
        {flashcards?.flashcards}
      </>
  )
}

export default Page
