'use server'

import React from 'react'
import Account from './account'

export default async function Page (): Promise<React.JSX.Element> {
  return (
    <Account />
  )
}
