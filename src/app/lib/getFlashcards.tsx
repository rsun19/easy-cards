import React from 'react'
import { type AnswerType, type QuestionType, type AccessTokenResponse } from '@/types'
import { getAccessToken } from './getAccessToken'
import { redirect } from 'next/navigation'
import { getFlashcardsFromAPI } from './getFlashcardsFromAPI'
import SetCard from '../sets/[slug]/setCards'

export const getFlashcards = async (accessToken: string, refreshToken: string, id: string): Promise<React.JSX.Element[]> => {
  let userSetData = await getFlashcardsFromAPI(accessToken, id)
  if (userSetData === null) {
    const response = await getAccessToken(refreshToken)
    if (response.ok) {
      const textResponse = await response.text()
      const textResponseJSON: AccessTokenResponse = JSON.parse(textResponse)
      userSetData = await getFlashcardsFromAPI(textResponseJSON.accessToken, id)
      if (userSetData === null) {
        alert('Failed to fetch sets')
        return []
      }
    } else {
      redirect('/api/signout')
    }
  }
  if (userSetData === null) {
    alert('Sets failed to load')
  } else {
    const responseData = JSON.parse(userSetData)
    const flashcards = []
    for (let i = 0; i < responseData.length; i++) {
      const answers = []
      const question: QuestionType = {
        id: responseData[i].id,
        question: responseData[i].question
      }
      for (let j = 0; j < responseData[i].answers; j++) {
        const answer: AnswerType = {
          id: responseData[i].answers[j].id,
          isCorrect: responseData[i].answers[j].isCorrect,
          answer: responseData[i].answers[j].answer
        }
        responseData[i].answers[j].isCorrect === true
          ? answers.unshift(answer)
          : answers.push(answer)
      }
      flashcards.push(<SetCard question={question} answer={answers} />)
    }
    return flashcards
  }
  return []
}
