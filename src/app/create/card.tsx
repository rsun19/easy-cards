import React from 'react'
import { FiTrash } from 'react-icons/fi'

interface CardProps {
  id: string
  removeCard: (id: string) => void
}

// create delete icon...
const Card: React.FC<CardProps> = ({ id, removeCard }) => {
  return (
    <div className='m-3 p-5 bg-slate-400'>
      <div className='flex gap-6 mb-3'>
        <textarea
          id={ `${id}-question` }
          placeholder="Question"
          className= 'flex-auto block rounded-lg py-2 px-3 border border-gray-300 bg-gray-50'
        />
        <textarea
          id={ `${id}-answer` }
          placeholder="Answer"
          className= 'flex-auto block rounded-lg py-2 px-3 border border-gray-300 bg-gray-50'
        />
      </div>
      <FiTrash size={30} color='white' className='cursor-pointer' onClick={() => { removeCard(id) }}/>
    </div>
  )
}

export default Card
