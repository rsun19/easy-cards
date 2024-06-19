'use client'
import React, { useEffect, useState } from 'react'
import SetCard from './setCard'
import { getUserSets } from '../lib/getUserSets'
import { type AccessTokenResponse } from '@/types'
import { getAccessToken } from '../lib/getAccessToken'
import { useRouter } from 'next/navigation'

interface SetProps {
  accessToken: string
  refreshToken: string
}

const Set: React.FC<SetProps> = ({ accessToken, refreshToken }): React.JSX.Element => {
  const router = useRouter()
  const [setData, setSetData] = useState<React.JSX.Element[]>([])
  const requestSet = async (accessToken: string): Promise<void> => {
    let userSetData = await getUserSets(accessToken)
    if (userSetData === null) {
      const response = await getAccessToken(refreshToken)
      if (response.ok) {
        const textResponse = await response.text()
        const textResponseJSON: AccessTokenResponse = JSON.parse(textResponse)
        userSetData = await getUserSets(textResponseJSON.accessToken)
        if (userSetData === null) {
          alert('Failed to fetch sets')
          return
        }
      } else {
        router.push('/api/signout')
      }
    }
    if (userSetData === null) {
      alert('Sets failed to load')
    } else {
      const responseData = JSON.parse(userSetData)
      console.log(responseData)
      const sets = []
      for (let i = 0; i < responseData.sets.length; i++) {
        sets.push(
          <SetCard
          key={responseData.sets[i].id.toString()}
          author={responseData.username}
          name={responseData.sets[i].name} />
        )
        setSetData(sets)
      }
    }
  }

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await requestSet(accessToken)
    }

    void fetchData()
  }, [])

  return (
    <>
      {setData.map((set, index) => {
        return (
          <div key={index}>
            {set}
          </div>
        )
      })}
    </>
  )
}

export default Set
