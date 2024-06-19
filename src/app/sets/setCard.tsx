'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

export interface SetProps {
  id: number
  name: string
  author: string
}

const SetCard: React.FC<SetProps> = ({ id, name, author }): React.JSX.Element => {
  const router = useRouter()
  return (
    <div onClick={() => { router.push(`/sets/${id}`) }} className="max-w rounded-lg overflow-hidden border mx-5 cursor-pointer mb-5">
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
