'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Flashcard from './flashcard'
// import axios from 'axios'

const FlashcardPage = (): React.JSX.Element => {
  // making dummy data
  const [flashcardIdx, setFlashcardIdx] = useState(0)
  const [flashcardList, setFlashcardList] = useState<React.JSX.Element[]>([])

  /*
  Simulating flashcard retrieval
  */
  useEffect(() => {
    const cards: React.JSX.Element[] = []
    for (let i = 0; i < 10; ++i) {
      cards.push(<Flashcard key={i} question={i.toString()} answer="answer" />)
    }
    console.log(cards)
    setFlashcardList(cards)
  }, [])

  const moveToPrevFlashcard = (): void => {
    setFlashcardIdx(flashcardIdx => (flashcardIdx > 0 ? flashcardIdx - 1 : flashcardIdx))
  }

  const moveToNextFlashcard = (): void => {
    setFlashcardIdx(flashcardIdx => (flashcardIdx < flashcardList.length - 1 ? flashcardIdx + 1 : flashcardIdx))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowLeft') {
        moveToPrevFlashcard()
      } else if (e.key === 'ArrowRight') {
        moveToNextFlashcard()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [flashcardList])

  return (
        <div>
        <Navbar />
        <div className='m-3' style={{ height: '70vh' }}>
          {flashcardList[flashcardIdx]}
        </div>
        </div>
  )
}

export default FlashcardPage
