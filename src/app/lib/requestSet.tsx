import React from 'react'
import { type AccessTokenResponse } from '@/types'
import { getUserSets } from './getUserSets'
import { getAccessToken } from './getAccessToken'
import SetCard from '../sets/setCard'
import { redirect } from 'next/navigation'

export const requestSet = async (accessToken: string, refreshToken: string): Promise<React.JSX.Element[]> => {
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
