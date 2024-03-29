import React from 'react'

interface CardProps {
  id: string
}

const Card: React.FC<CardProps> = ({ id }) => {
  return (
    <div className='m-3'>
      <div className='flex gap-6'>
        <textarea
          id={ `${id}-question` }
          placeholder="Question"
          className= 'flex-auto block rounded-lg py-2 px-3 border border-gray-300 bg-gray-50'/>

          <textarea
          id={ `${id}-answer` }
        //   onChange={() => {
        //     const answerElement = document.getElementById(`${id}-answer`) as HTMLInputElement
        //     if (answerElement != null) {
        //       handleAnswerChange(Number(id), answerElement.value)
        //     }
        //   }}
          placeholder="Answer"
          className= 'flex-auto block rounded-lg py-2 px-3 border border-gray-300 bg-gray-50'/>
      </div>
    </div>
  )
}

export default Card
