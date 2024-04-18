/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
'use server'
import React from 'react'
import { auth } from '../../auth'

export default async function Navbar (): Promise<React.JSX.Element> {
  const session = await auth()
  const showAccountInformation = (): React.JSX.Element => {
    if (session !== null) {
      return (
        <div>
            <a href='/account' className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 cursor-pointer">
                Account
            </a>
        </div>
      )
    } else {
      return (
        <div>
            <a href='/api/login' className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 cursor-pointer">
                Log in
            </a>
        </div>
      )
    }
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <a href='/' className="font-semibold text-xl tracking-tight">EasyCards</a>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
            <a href="/search" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Search
            </a>
            {session !== null &&
            <div>
                <a href="/create" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                Create
                </a>
                <a href="/sets" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    Sets
                </a>
            </div>
            }
            </div>
            {showAccountInformation()}
        </div>
    </nav>
  )
}
