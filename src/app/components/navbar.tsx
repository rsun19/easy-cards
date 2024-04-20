'use server'
import React from 'react'
import { auth } from '../../auth'
import SubNavbar from './sub-navbar'

export default async function Navbar (): Promise<React.JSX.Element> {
  const session = await auth()

  return (
      <div className='w-full bg-teal-400'>
        <SubNavbar session={session !== null} />
      </div>
  )
}
