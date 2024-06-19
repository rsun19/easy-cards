import { type AnswerType, type QuestionType } from '@/types'
import React from 'react'

interface SetCardProps {
  question: QuestionType
  answer: AnswerType[]
}

const SetCard: React.FC<SetCardProps> = ({ question, answer }): React.JSX.Element => {
  return (
    <div>
      <div className='flex flex-col lg:flex-row'>
        <div className= 'basis-1/2 ml-3 lg:ml-6 mr-3 p-5 shadow-sm rounded-xl mb-5 border border-gray-300'>
          {question.question}
        </div>
        {answer.length === 1
          ? (<div className= 'basis-1/2 ml-3 mr-3 lg:mr-6 p-5 shadow-sm rounded-xl mb-5 border border-gray-300'>
          {answer[0].answer}
        </div>)
          : (<div className= 'basis-1/2 ml-3 mr-3 lg:mr-6 p-5 shadow-sm rounded-xl mb-5 border border-gray-300'>
        Multiple choice answers are a work in progress...
      </div>)}
      </div>
    </div>
  )
}

export default SetCard
