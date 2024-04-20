'use server'

import React from 'react'
import Account from './account'
import { cookies } from 'next/headers'

export default async function Page (): Promise<React.JSX.Element> {
  const cookieStore = cookies()
  const session = cookieStore.get('session')
  console.log(session?.value)
  return (
    <Account />
  )
}
