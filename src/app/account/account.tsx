import React from 'react'
import Navbar from '../components/navbar'

const Account = (): React.JSX.Element => {
  return (
    <div>
        <Navbar />
        <a href='/api/signout' className='mt-5 button px-6 py-3 bg-teal-500 rounded'>Sign Out</a>
    </div>
  )
}

export default Account
