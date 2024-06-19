'use client'

import Link from 'next/link'
import React from 'react'

export interface SetProps {
  id: number
  name: string
  author: string
}

const SetCard: React.FC<SetProps> = ({ id, name, author }): React.JSX.Element => {
  return (
    <div className="max-w rounded-lg overflow-hidden border mx-5 mb-5">
      <Link
        href={{
          pathname: `/sets/${id}`,
          query: { id, name, author }
        }} className='cursor-pointer'>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{name}</div>
            <p className="text-gray-700 text-base">
              {author}
            </p>
          </div>
      </Link>
    </div>
  )
}

export default SetCard
