'use server'
import React from 'react'
import Navbar from '../components/navbar'
import { cookies } from 'next/headers'
import SetCard from './setCard'
import { type UserSetCards } from '@/types'

const Sets = async (): Promise<React.JSX.Element> => {
  const cookie = cookies().get('session')?.value
  if (typeof cookie !== 'undefined') {
    // const cookieData = JSON.parse(cookie)
    const setData: UserSetCards[] = [
      {
        id: 1,
        username: 'sample username',
        name: 'sample set'
      },
      {
        id: 2,
        username: 'sample username 2',
        name: 'cool set'
      }
    ]
    return (
      <>
        <Navbar />
        <br />
        {
          setData.map((set) => {
            return (
              <SetCard key={set.id.toString()} author={set.username} name={set.name} />
            )
          })
        }
      </>
    )
  } else {
    return (
      <>
        access denied.
      </>
    )
  }
}

export default Sets
