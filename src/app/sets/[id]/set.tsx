import { type Flashcards } from '@/types'
import React from 'react'
import SetCard from './setCards'

interface SetProps {
  cards: Flashcards[]
}

const Set: React.FC<SetProps> = ({ cards }): React.JSX.Element => {
  return (
    <>
      <br />
      {cards.map((card, index) => {
        return (
          <div key={index}>
            <SetCard question={card.question} answer={card.answer} />
          </div>
        )
      })}
    </>
  )
}

export default Set
