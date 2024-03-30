/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import Navbar from './navbar'
import React, { useState } from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import { insertUser, redirectToAccountPage, redirectToLogin } from './user-operations'
import { type Profile } from './database-interfaces'

export default function Home (): React.JSX.Element {
  return (
    <SessionProvider>
      <LandingPage />
    </SessionProvider>
  )
}

const LandingPage = async (): Promise<React.JSX.Element> => {
  const { data: session } = useSession()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [id, setID] = useState<string>('')

  const setEmailAndID = async (email: string): Promise<Profile> => {
    const user = await insertUser(email)
    localStorage.setItem('email', user.email)
    if (user !== null) {
      if (user.id !== null) {
        localStorage.setItem('id', user.id.toString())
        setID(user.id.toString())
      }
    }
    setIsLoggedIn(true)
    return user
  }

  if (session != null) {
    if (session.user != null) {
      const email = localStorage.getItem('email')
      if (email !== null) {
        const id = localStorage.getItem('id')
        const name = localStorage.getItem('name')
        if (session.user.email !== null && email === session.user.email && name === null) {
          await redirectToAccountPage()
        } else if (session.user.email !== null && email === session.user.email && id !== null && name !== null) {
          setID(id)
          setIsLoggedIn(true)
        } else {
          await setEmailAndID(session.user.email!)
        }
      } else {
        await setEmailAndID(session.user.email!)
      }
    }
  } else {
    await redirectToLogin()
  }

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} id={id} />
      <div className='bg-teal-400 flex flex-col gap-10 justify-center items-center text-white' style={{ height: '95vh' }}>
        <div className='text-4xl'>
          Welcome to Easy Cards
        </div>
        <div className='text-xl'>
          Edit in real time, or make flashcards using generative AI tools!
        </div>
        <a href='/create' className='text-xl cursor-pointer bg-cyan-500 rounded-xl px-5 py-3 z-3'>
          Create a new set today!
        </a>
      </div>
    </>
  )
}
