'use server'
import React from 'react'
import Navbar from '../components/navbar'
import Create from './createPage'
import { cookies } from 'next/headers'

export default async function Page (): Promise<React.JSX.Element> {
  const cookie = cookies().get('session')
  if (typeof cookie !== 'undefined') {
    return (
      <div>
        <Navbar />
        <Create cookie={cookie?.value} />
      </div>
    )
  } else {
    return (
      <div>
        Permission denied.
      </div>
    )
  }
}
