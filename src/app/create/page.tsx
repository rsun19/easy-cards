'use client'
import React, { useState } from 'react'
import Navbar from '../navbar'
// import saveCards from './save-cards'
import Card from './card'

const Create = (): React.JSX.Element => {
  const [cardNum, setCardNum] = useState(0)
  const [cards, setCards] = useState([<Card key='0' id='0' removeCard={removeCard}/>])

  function addCards (): void {
    const newCardNum = cardNum
    setCardNum(cardNum + 1)
    setCards([...cards, <Card key={(newCardNum + 1).toString()} id={(newCardNum + 1).toString()} removeCard={removeCard}/>])
  }

  function removeCard (id: string): void {
    const newCardsList = cards
    for (let i = 0; i < cards.length; ++i) {
      if (cards[i].props.id === id) {
        newCardsList.splice(i, 1)
      }
    }
    setCards(newCardsList)
  }

  return (
    <>
      <Navbar />
      <div className='create-container'>
      <h2 className="ml-3 my-3 text-xl" >Create Flash Cards</h2>
      <div className='m-3'>
        <input type="text" id="setName" placeholder="Name your set" className= 'block rounded-lg py-2 px-3 border border-gray-300 bg-gray-50'/>
      </div>
      <h3 className='ml-3 mb-3'></h3>
      <div>
        {cards.map((card, index) => (
          <div key={index}>
            {card}
          </div>
        ))}
      </div>
      <div className='my-3 text-center flex items-center justify-center'>
        <div className='py-2 px-4 bg-teal-700 rounded-xl cursor-pointer' onClick={() => { addCards() }}>
          Add a card
        </div>
      </div>
      <div className='my-3 text-center flex items-center justify-center'>
        <div className='py-2 px-4 bg-teal-700 rounded-xl cursor-pointer' onClick={() => {
          const cardMapping = new Map()
          cards.forEach((card) => {
            const id = card.props.id
            const questionElement = document.getElementById(`${id}-question`) as HTMLInputElement
            const answerElement = document.getElementById(`${id}-answer`) as HTMLInputElement
            cardMapping.set(id, [questionElement, answerElement])
          })
        }}>
          Submit
        </div>
      </div>
      </div>
    </>
  )
}

export default Create
