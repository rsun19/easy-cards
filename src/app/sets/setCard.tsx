'use client'

import React from 'react'

export interface SetProps {
  name: string
  author: string
}

const SetCard: React.FC<SetProps> = ({ name, author }): React.JSX.Element => {
  return (
    <div onClick={() => { alert('api not available yet') }} className="max-w rounded-lg overflow-hidden shadow-md mx-5 cursor-pointer mb-5">
        <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{name}</div>
            <p className="text-gray-700 text-base">
              {author}
            </p>
        </div>
    </div>
  )
}

export default SetCard
