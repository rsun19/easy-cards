'use client'
import React, { useEffect, useState } from 'react'
import Flashcard from './flashcard'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import { type SetCardProps } from '@/types'
import { Divider } from '@mantine/core'

interface getFlashcardsType {
  set: string
  flashcards: SetCardProps[]
}

const FlashcardPage: React.FC<getFlashcardsType> = ({ flashcards }): React.JSX.Element => {
  const [flashcardIdx, setFlashcardIdx] = useState(0)
  const [flashcardList, setFlashcardList] = useState<React.JSX.Element[]>([])

  useEffect(() => {
    const cards: React.JSX.Element[] = []
    for (let i = 0; i < flashcards.length; i++) {
      cards.push(<Flashcard key={i} question={flashcards[i].question} answers={flashcards[i].answers} />)
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
    <>
        <div className='m-5' style={{ height: '75vh' }}>
            {flashcardList[flashcardIdx]}
        </div>
        <div className='mx-5 max-w-full rounded-xl overflow-hidden shadow-lg text-xl'
        style={{ backgroundColor: 'darkseagreen', color: 'white' }}
        >
            <div className='py-3 flex items-stretch justify-evenly'>
              <div className='cursor-pointer' onClick={moveToPrevFlashcard}>
                  <MdNavigateBefore />
              </div>
              <Divider orientation="vertical"/>
              <div className='cursor-pointer' onClick={moveToNextFlashcard}>
                  <MdNavigateNext />
              </div>
            </div>
        </div>
    </>
  )
}

export default FlashcardPage
