'use server'
import React from 'react'
import Navbar from '../components/navbar'
import FlashcardPage from './flashcardPage'

export default async function Page (): Promise<React.JSX.Element> {
  return (
    <div>
      <Navbar />
      <FlashcardPage />
    </div>
  )
}
