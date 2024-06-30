'use server'
import React from 'react'
import Navbar from '../../components/navbar'
import { cookies } from 'next/headers'
import { getFlashcards } from '@/app/lib/getFlashcards'
import { type RefreshTokenResponse } from '@/types'
import SetCard from './setCards'
import { Button } from '@mantine/core'
import Link from 'next/link'

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
        <div className='mt-3 text-center text-2xl flex flex-col justify-center items-center gap-3'>
          {flashcards?.set.name}
          <Button
            component={Link}
            href={`/flashcard/${flashcards?.set.id}`}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          >
            Study flashcards
          </Button>
        </div>
        {
          flashcards?.flashcards.map((flashcard, index) => {
            return <SetCard key={index} question={flashcard.question} answers={flashcard.answers} />
          })
        }
      </>
  )
}

export default Page
