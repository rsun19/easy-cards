'use server'
import React from 'react'
import Navbar from '../../components/navbar'
import { cookies } from 'next/headers'
import Set from './set'

interface PageParams {
  params: {
    slug: string
  }
  searchParams: {
    id: string
    name: string
    author: string
  }
}

const Page = async ({ params, searchParams }: PageParams): Promise<React.JSX.Element> => {
  const cookie = cookies().get('session')
  const flashcardData = [
    {
      question: 'q1',
      answer: ['answer1']
    },
    {
      question: 'q2',
      answer: ['answer2']
    }
  ]
  if (typeof cookie === 'undefined') {
    return (
        <>
          access denied.
        </>
    )
  }
  // const cookieData: RefreshTokenResponse = JSON.parse(cookie.value)
  return (
      <>
        <Navbar />
        <Set cards={flashcardData} />
      </>
  )
}

export default Page
