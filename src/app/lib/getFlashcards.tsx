import {
  type AnswerType,
  type QuestionType,
  type AccessTokenResponse,
  type UserSetCards,
  type SetCardProps,
} from "@/types";
import { getAccessToken } from "./getAccessToken";
import { getFlashcardsFromAPI } from "./getFlashcardsFromAPI";

export interface GetFlashcardsType {
  set: UserSetCards | null;
  flashcards: SetCardProps[];
  visit: boolean;
}

export const getFlashcards = async (
  accessToken: string,
  refreshToken: string,
  id: string,
): Promise<GetFlashcardsType | null> => {
  let userSetData = await getFlashcardsFromAPI(accessToken, id);
  console.log(userSetData);
  if (userSetData === null) {
    try {
      const response = await getAccessToken(refreshToken);
      if (response.ok) {
        const textResponse = await response.text();
        const textResponseJSON: AccessTokenResponse = JSON.parse(textResponse);
        userSetData = await getFlashcardsFromAPI(
          textResponseJSON.accessToken,
          id,
        );
        if (userSetData === null) {
          console.log("Failed to fetch sets");
          return null;
        }
      } else {
        console.log("Failed to fetch sets");
        return null;
      }
    } catch (e) {
      console.log("Failed to fetch sets");
      return null;
    }
  }
  if (userSetData === null) {
    console.log("Sets failed to load");
  } else {
    const responseData = JSON.parse(userSetData);
    const flashcards = [];
    const flashcardsArr = responseData.flashcards;
    for (let i = 0; i < flashcardsArr.length; i++) {
      const answers = [];
      const question: QuestionType = {
        id: flashcardsArr[i].question.id,
        question: flashcardsArr[i].question.question,
      };
      for (let j = 0; j < flashcardsArr[i].answers.length; j++) {
        const answer: AnswerType = {
          id: flashcardsArr[i].answers[j].id,
          isCorrect: flashcardsArr[i].answers[j].isCorrect,
          answer: flashcardsArr[i].answers[j].answer,
        };
        flashcardsArr[i].answers[j].isCorrect === true
          ? answers.unshift(answer)
          : answers.push(answer);
      }
      flashcards.push({
        question,
        answers,
      });
    }
    const visit = responseData.visit;
    const set: UserSetCards = {
      id: responseData.set.id,
      name: responseData.set.name
    };
    return { set, flashcards, visit };
  }
  return null;
};
