'use server'
import React from 'react'
import Navbar from '../components/navbar'
import Create from './createPage'

export default async function Page (): Promise<React.JSX.Element> {
  return (
    <div>
      <Navbar />
      <Create />
    </div>
  )
}
