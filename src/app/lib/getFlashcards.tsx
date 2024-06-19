import React from 'react'
import { type AnswerType, type QuestionType, type AccessTokenResponse, type UserSetCards } from '@/types'
import { getAccessToken } from './getAccessToken'
import { getFlashcardsFromAPI } from './getFlashcardsFromAPI'
import SetCard from '../sets/[slug]/setCards'

interface getFlashcardsType {
  set: UserSetCards
  flashcards: React.JSX.Element[]
}

export const getFlashcards = async (accessToken: string, refreshToken: string, id: string, username: string): Promise<getFlashcardsType | null> => {
  let userSetData = await getFlashcardsFromAPI(accessToken, id)
  if (userSetData === null) {
    try {
      const response = await getAccessToken(refreshToken)
      if (response.ok) {
        const textResponse = await response.text()
        const textResponseJSON: AccessTokenResponse = JSON.parse(textResponse)
        userSetData = await getFlashcardsFromAPI(textResponseJSON.accessToken, id)
        if (userSetData === null) {
          alert('Failed to fetch sets')
          return null
        }
      } else {
        alert('Failed to fetch sets')
        return null
      }
    } catch (e) {
      alert('Failed to fetch sets')
      return null
    }
  }
  if (userSetData === null) {
    alert('Sets failed to load')
  } else {
    const responseData = JSON.parse(userSetData)
    const flashcards = []
    const flashcardsArr = responseData.flashcards
    console.log(username)
    for (let i = 0; i < flashcardsArr.length; i++) {
      const answers = []
      const question: QuestionType = {
        id: flashcardsArr[i].question.id,
        question: flashcardsArr[i].question.question
      }
      for (let j = 0; j < flashcardsArr[i].answers.length; j++) {
        const answer: AnswerType = {
          id: flashcardsArr[i].answers[j].id,
          isCorrect: flashcardsArr[i].answers[j].isCorrect,
          answer: flashcardsArr[i].answers[j].answer
        }
        flashcardsArr[i].answers[j].isCorrect === true
          ? answers.unshift(answer)
          : answers.push(answer)
      }
      flashcards.push(<SetCard question={question} answers={answers} />)
    }
    const set: UserSetCards = {
      id: responseData.set.id,
      name: responseData.set.name,
      username
    }
    return { set, flashcards }
  }
  return null
}
