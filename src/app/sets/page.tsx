'use server'
import React from 'react'
import Navbar from '../components/navbar'
import { cookies } from 'next/headers'
import Set from './sets'
import { type AccessTokenResponse, type RefreshTokenResponse } from '@/types'
import { getUserSets } from '../lib/getUserSets'
import { getAccessToken } from '../lib/getAccessToken'
import SetCard from './setCard'
import { redirect } from 'next/navigation'

const Page = async (): Promise<React.JSX.Element> => {
  const requestSet = async (accessToken: string, refreshToken: string): Promise<React.JSX.Element[]> => {
    let userSetData = await getUserSets(accessToken)
    if (userSetData === null) {
      const response = await getAccessToken(refreshToken)
      if (response.ok) {
        const textResponse = await response.text()
        const textResponseJSON: AccessTokenResponse = JSON.parse(textResponse)
        userSetData = await getUserSets(textResponseJSON.accessToken)
        if (userSetData === null) {
          alert('Failed to fetch sets')
          return []
        }
      } else {
        redirect('/api/signout')
      }
    }
    if (userSetData === null) {
      alert('Sets failed to load')
    } else {
      const responseData = JSON.parse(userSetData)
      const sets = []
      for (let i = 0; i < responseData.sets.length; i++) {
        sets.push(
          <SetCard
          key={i.toString()}
          id={responseData.sets[i].id.toString()}
          author={responseData.username}
          name={responseData.sets[i].name} />
        )
      }
      return sets
    }
    return []
  }

  const cookie = cookies().get('session')
  if (typeof cookie === 'undefined') {
    return (
      <>
        access denied.
      </>
    )
  }

  const cookieData: RefreshTokenResponse = JSON.parse(cookie.value)
  const sets = await requestSet(cookieData.accessToken, cookieData.refreshToken)

  return (
    <>
      <Navbar />
      <br />
      <p className='text-center text-2xl'>Sets:</p>
      <br />
      <Set sets={sets} />
    </>
  )
}

export default Page
