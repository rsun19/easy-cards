'use client'
import React, { useState } from 'react'
import Card from '../components/card'

type CardMapping = [string, [string]]

interface CreateProps {
  cookie: string
}

const Create: React.FC<CreateProps> = ({ cookie }): React.JSX.Element => {
  const [cardNum, setCardNum] = useState(0)
  const [cards, setCards] = useState([<Card key='0' id='0' removeCard={removeCard}/>])

  const cookieInfo = JSON.parse(cookie)
  const userId = cookieInfo.id

  function addCards (): void {
    const newCardNum = cardNum
    setCardNum(cardNum + 1)
    setCards([...cards, <Card key={(newCardNum + 1).toString()} id={(newCardNum + 1).toString()} removeCard={removeCard}/>])
  }

  function removeCard (id: string): void {
    console.log(cards)

    setCards(cards => {
      const newCardsList = [...cards]
      console.log(newCardsList)
      for (let i = 0; i < cards.length; ++i) {
        if (cards[i].props.id === id) {
          newCardsList.splice(i, 1)
        }
      }console.log(newCardsList)
      return newCardsList
    })
  }

  async function saveCards (title: string, cards: CardMapping[]): Promise<void> {
    const setMap = {
      title,
      cards
    }
    const response = await fetch(`${process.env.API_URL}/auth/token/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: userId,
        setMap
      })
    })
    if (response.ok) {
      console.log('res ok')
    } else {
      console.log('set err')
    }
  }

  return (
    <>
      <div className='create-container'>
      <h2 className="ml-3 my-3 text-xl" >Create Flash Cards</h2>
      <div className='m-3'>
        <input type="text" id="setName" placeholder="Name your set" className= 'w-full block rounded-lg py-2 px-3 border border-gray-300 bg-gray-50'/>
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
        <div className='py-2 px-4 bg-cyan-500 rounded-xl cursor-pointer' onClick={() => { addCards() }}>
          Add a card
        </div>
      </div>
      <div className='my-3 text-center flex items-center justify-center'>
        <div className='py-2 px-4 bg-cyan-500 rounded-xl cursor-pointer' onClick={() => {
          const setName = document.getElementById('setName') as HTMLInputElement
          const cardMapping: CardMapping[] = []
          cards.forEach((card) => {
            const id = card.props.id
            const questionDiv = document.getElementById(`question-${id}`)
            const questionContents = questionDiv?.querySelector('.ql-editor')?.innerHTML
            const answerDiv = document.getElementById(`answer-${id}`)
            const answerContents = answerDiv?.querySelector('.ql-editor')?.innerHTML
            if (typeof questionContents !== 'undefined' &&
                typeof answerContents !== 'undefined') {
              cardMapping.push([questionContents, [answerContents]])
            }
          })
          void saveCards(setName.value, cardMapping)
        }}>
          Submit
        </div>
      </div>
      </div>
    </>
  )
}

export default Create
