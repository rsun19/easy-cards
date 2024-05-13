'use server'
import Navbar from '../../../../components/navbar'
import React from 'react'

const TokenFailure = async (): Promise<React.JSX.Element> => {
  return (
    <div>
      <Navbar />
      <div>
      <div className="max-w-md rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Login Failure</div>
          <p className="text-gray-700 text-base">
            Login Failed. Either the Google API is down or some other undefined behavior occured.
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default TokenFailure
