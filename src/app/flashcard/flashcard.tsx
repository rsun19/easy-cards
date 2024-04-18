import React, { useEffect, useState } from 'react'
import './styles.css'

interface FlashcardProps {
  question: string
  answer: string
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }): React.JSX.Element => {
  const [showQuestion, setShowQuestion] = useState<boolean>(true)

  const flipCard = (): void => {
    setShowQuestion(!showQuestion)
    const flashcard = document.getElementById('flashcard')
    const flashcardContent = document.getElementById('flashcard-content')
    if (flashcard !== null && flashcardContent !== null) {
      flashcard.classList.toggle('flip-card')
      flashcardContent.classList.toggle('flashcard-content-flip')
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        flipCard()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showQuestion])

  return (
    <div
      id='flashcard'
      className='max-w-full cursor-pointer rounded-xl overflow-hidden shadow-lg flashcard flex items-center justify-center flex-col text-2xl'
      style={{ height: '100%', backgroundColor: 'darkseagreen', color: 'white' }}
      onClick={flipCard}
      >
        <div id='flashcard-content'>
          {
          showQuestion && <div id='question'>
              {question}
          </div>
          }
          {
          !showQuestion && <div id='answer'>
              {answer}
          </div>
          }
        </div>
    </div>
  )
}

export default Flashcard
