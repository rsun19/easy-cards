import React from 'react'

interface SetCardProps {
  question: string
  answer: string[]
}

const SetCard: React.FC<SetCardProps> = ({ question, answer }): React.JSX.Element => {
  return (
    <div>
      <div className='flex flex-col lg:flex-row'>
        <div className= 'basis-1/2 ml-3 lg:ml-6 mr-3 p-5 shadow-sm rounded-xl mb-5 border border-gray-300'>
          {question}
        </div>
        <div className= 'basis-1/2 ml-3 mr-3 lg:mr-6 p-5 shadow-sm rounded-xl mb-5 border border-gray-300'>
          {answer}
        </div>
      </div>
    </div>
  )
}

export default SetCard
