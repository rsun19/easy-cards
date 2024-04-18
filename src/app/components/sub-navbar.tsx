'use client'
import React, { useEffect, useState } from 'react'
import { IoMenuOutline } from 'react-icons/io5'
import './styles.css'

interface SubNavbarProps {
  session: boolean
}

const SubNavbar: React.FC<SubNavbarProps> = ({ session }): React.JSX.Element => {
  function useWindowWidth (): boolean | null {
    const [lg, setLg] = useState<boolean | null>(null)
    useEffect(() => {
      const handleResize = (): void => {
        setLg(window.innerWidth >= 1024)
      }
      handleResize()
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [])
    return lg
  }
  const lg = useWindowWidth()

  const handleDropdown = (): void => {
    const dropdown = document.getElementById('dropdown')
    if (dropdown !== null) {
      if (dropdown.classList.contains('dropdown-hide')) {
        dropdown.classList.remove('dropdown-hide')
      } else {
        dropdown.classList.add('dropdown-hide')
      }
    }
  }

  const regularMenu = (): React.JSX.Element => {
    return (
        <div>
            {lg !== null && lg &&
            <div className='flex items-center justify-between width-full p-5 bg-teal-400 text-white text-lg'>
                <div className='gap-8 flex flex-row w-6/12'>
                    <a href='/' className="font-semibold text-xl tracking-tight">EasyCards</a>
                    <div className='text-md'>
                        <a href="/search" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Search
                        </a>
                        {session &&
                            <a href="/create" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                                Create
                            </a>}
                        { session && <a href="/sets" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                            Sets
                        </a>}
                    </div>
                </div>
                {session &&
                <div>
                    <a href='/account' className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 cursor-pointer">
                        Account
                    </a>
                </div>}
                {!session &&
                <div>
                    <a href='/api/login' className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 cursor-pointer">
                        Log in
                    </a>
                </div>}
            </div>}
        </div>
    )
  }

  const dropdown = (): React.JSX.Element => {
    return (
        <div id='dropdown' className='dropdown-hide flex-col bg-teal-400 pb-5'>
            <div className='pl-5'>
                <div className='text-md'>
                    <a href="/search" className="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Search
                    </a>
                    {session &&
                    <a href="/create" className="block mt-3 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Create
                    </a>}
                    { session &&
                    <a href="/sets" className="block mt-3 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        Sets
                    </a>}
                </div>
                {session &&
                <a href='/account' className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-3 lg:mt-0 cursor-pointer">
                    Account
                </a>}
                {!session &&
                <a href='/api/login' className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-3 lg:mt-0 cursor-pointer">
                    Log in
                </a>
                }
            </div>
        </div>
    )
  }

  return (
    <div className='bg-teal-400'>
        {lg !== null && lg && regularMenu()}
        {lg !== null && !lg &&
        <div className="flex justify-between pl-5 pr-5 pt-3 bg-teal-400 text-white text-lg pb-3">
            <a href='/' className="font-semibold text-xl tracking-tight">EasyCards</a>
            <div className='cursor-pointer' onClick={handleDropdown}>
                <IoMenuOutline size={30} />
            </div>
        </div>}
        {lg !== null && !lg && dropdown()}
    </div>
  )
}

export default SubNavbar
