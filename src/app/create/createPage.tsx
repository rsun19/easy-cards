/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import React, { useState } from 'react'
import Card from '../components/card'
import { insertSet } from '../lib/insertSet'
import { getAccessToken } from '../lib/getAccessToken'
import { useRouter } from 'next/navigation'
import { type AccessTokenResponse } from '@/types'
import 'quill/dist/quill.snow.css'
import { validateQuillContents } from '../lib/utils'

type CardMapping = [string, [string], number]

interface CreateProps {
  accessToken: string
  refreshToken: string
}

const Create: React.FC<CreateProps> = ({ accessToken, refreshToken }): React.JSX.Element => {
  const [cardNum, setCardNum] = useState(0)
  const [cards, setCards] = useState([<Card key='0' id='0' removeCard={removeCard}/>])
  const router = useRouter()

  function addCards (): void {
    const newCardNum = cardNum
    setCardNum(cardNum + 1)
    setCards([...cards, <Card key={(newCardNum + 1).toString()} id={(newCardNum + 1).toString()} removeCard={removeCard}/>])
  }

  function removeCard (id: string): void {
    setCards(cards => {
      const newCardsList = [...cards]
      for (let i = 0; i < cards.length; ++i) {
        if (cards[i].props.id === id) {
          newCardsList.splice(i, 1)
        }
      }
      return newCardsList
    })
  }

  const saveCards = async (title: string, cards: CardMapping[]): Promise<void> => {
    const setMap = {
      title,
      cards
    }
    const response = await insertSet(accessToken, JSON.stringify(setMap))
    if (response.ok) {
      router.push('/')
    } else {
      try {
        const response = await getAccessToken(refreshToken)
        if (response.ok) {
          const textResponse = await response.text()
          const textResponseJSON: AccessTokenResponse = JSON.parse(textResponse)
          const secondTry = await insertSet(textResponseJSON.accessToken, JSON.stringify(setMap))
          if (secondTry.ok) {
            router.push('/')
          } else {
            alert('Set failed to save')
          }
        } else {
          router.push('/api/signout')
        }
      } catch (e) {
        router.push('/api/signout')
      }
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
        <div className='py-2 px-4 bg-cyan-500 rounded-xl cursor-pointer' onClick={async () => {
          const Quill = (await (import('quill'))).default
          const setName = document.getElementById('setName') as HTMLInputElement
          const cardMapping: CardMapping[] = []
          cards.forEach((card) => {
            const id = card.props.id
            const questionDiv = document.getElementById(`question-${id}`)
            const answerDiv = document.getElementById(`answer-${id}`)
            if (questionDiv !== null && answerDiv !== null && typeof questionDiv !== 'undefined' &&
                typeof answerDiv !== 'undefined') {
              const questionQuill = Quill.find(questionDiv)
              const answerQuill = Quill.find(answerDiv)
              if (validateQuillContents(questionQuill) && validateQuillContents(answerQuill)) {
                // 2nd index is flag to determine correct answer. Will update when features are stabilized.
                cardMapping.push([JSON.stringify(questionQuill.getContents().ops), [JSON.stringify(answerQuill.getContents().ops)], 0])
              }
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
