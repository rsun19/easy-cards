'use client'
import React, { useEffect, useState } from 'react'
import Flashcard from './flashcard'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import useWindowWidth from '../hooks/useWindowWidth'

// import axios from 'axios'

const FlashcardPage = (): React.JSX.Element => {
  // making dummy data
  const [flashcardIdx, setFlashcardIdx] = useState(0)
  const [flashcardList, setFlashcardList] = useState<React.JSX.Element[]>([])
  const { lg } = useWindowWidth()
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
            {lg && <div className='m-5' style={{ height: '75vh' }}>
              {flashcardList[flashcardIdx]}
            </div>}
            {!lg && <div className='m-5' style={{ height: '60vh' }}>
              {flashcardList[flashcardIdx]}
            </div>}
            <div className='mx-5 max-w-full rounded-xl overflow-hidden shadow-lg text-xl'
            style={{ backgroundColor: 'darkseagreen', color: 'white' }}
            >
              <div className='py-3 flex items-stretch justify-evenly cursor-pointer'>
                <div onClick={moveToPrevFlashcard}>
                  <MdNavigateBefore />
                </div>
                <div onClick={moveToNextFlashcard}>
                  <MdNavigateNext />
                </div>
              </div>
            </div>
        </div>
  )
}

export default FlashcardPage
