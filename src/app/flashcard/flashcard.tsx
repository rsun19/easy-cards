import React, { useEffect, useState } from 'react'
import './styles.css'

interface FlashcardProps {
  question: string
  answer: string
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }): React.JSX.Element => {
  const [showQuestion, setShowQuestion] = useState<boolean>(true)

  useEffect(() => {
    const flipCard = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        setShowQuestion(!showQuestion)
      }
    }
    document.addEventListener('keydown', flipCard)

    return () => {
      document.removeEventListener('keydown', flipCard)
    }
  }, [showQuestion])

  return (
    <div className='flashcard flex items-center justify-center flex-col' style={{ height: '80%' }}>
        {showQuestion && <div id='question' className='flashcard-flip'>
            {question}
        </div>}
        {!showQuestion && <div id='answer' className='flashcard-flip'>
            {answer}
        </div>}
    </div>
  )
}

export default Flashcard
function setState(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.')
}

