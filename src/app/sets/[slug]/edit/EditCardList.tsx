/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../../lib/getAccessToken";
import { useRouter } from "next/navigation";
import { type SetCardProps, type AccessTokenResponse } from "@/types";
import "quill/dist/quill.snow.css";
import { validateQuillContents } from "../../../lib/utils";
import { type GetFlashcardsType } from "@/app/lib/getFlashcards";
import EditCard from "./EditCard";
import { editSet } from "@/app/lib/editSet";
import { deleteCard } from "@/app/lib/deleteCard";
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface CardMapping {
  questionId?: number
  answerId?: number
  question: string
  answer: string[]
  answerIndex: number
}

interface CardQuestion {
  questionId?: number
  question: string
}

interface CardAnswer {
  answerId?: number
  answer: string[]
  answerIndex: number
}

interface EditCardListProps extends GetFlashcardsType {
  accessToken: string;
  refreshToken: string;
}

const EditCardList: React.FC<EditCardListProps> = ({
  accessToken,
  refreshToken,
  set,
  flashcards,
}): React.JSX.Element => {
  const [highestID, setHighestID] = useState(0);
  const [cards, setCards] = useState<React.JSX.Element[]>([]);
  const oldVersionMap = new Map<number, SetCardProps>();
  const [oldVersionMapState, setOldVersionMapState] = useState<Map<number, SetCardProps>>(oldVersionMap);
  const router = useRouter();
  const oldSetName = set?.name

  useEffect(() => {
    window.katex = katex;
    const flashcardsList: React.JSX.Element[] = [];
    let highestIdNum = 0;
    flashcards.forEach((flashcard) => {
      flashcardsList.push(
        <EditCard
          key={flashcard.question.id.toString()}
          id={flashcard.question.id.toString()}
          question={flashcard.question}
          answers={flashcard.answers}
          removeCard={removeCard}
        />,
      );
      oldVersionMap.set(flashcard.question.id, flashcard);
      highestIdNum = Math.max(highestID, flashcard.question.id);
    });
    setCards(flashcardsList);
    setHighestID(highestIdNum)
    setOldVersionMapState(oldVersionMap);
    if (set) {
      (document.getElementById('setName') as HTMLInputElement).value = set.name
    }
  }, []);

  function addCards(): void {
    if (cards.length < 700) {
      setHighestID((id) => {
        const newHighestID = id;
        setHighestID(newHighestID + 1);
        setCards([
          ...cards,
          <EditCard
            key={(newHighestID + 1).toString()}
            id={(newHighestID + 1).toString()}
            removeCard={removeCard}
            question={null}
            answers={[]}
          />,
        ]);
        return newHighestID + 1;
      });
    } else {
      alert("A set has a maximum of 700 cards. Please create a new set.");
    }
  }

  async function removeCard(id: string): Promise<void> {
    const Quill = (await import("quill")).default;
    if (oldVersionMapState.has(Number(id))) {
      try {
        const response = await deleteCard(accessToken, Number(id));
        if (!response.ok) {
            const textResponseJSON: AccessTokenResponse = await response.json();
            const secondTry = await deleteCard(textResponseJSON.accessToken, Number(id));
            if (!secondTry.ok) {
              alert("Question failed to delete");
            }
          }
          oldVersionMap.delete(Number(id));
          setOldVersionMapState(oldVersionMap);
        } catch (e) {
        router.push("/api/signout");
      }
    } 
    setCards((cards) => {
      const newCardsList = [];
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].props.id === id) {
          continue;
        } else if (cards[i].props.question == null) {
          const questionDiv = document.getElementById(`question-${cards[i].props.id}`);
          const answerDiv = document.getElementById(`answer-${cards[i].props.id}`);
          if (
            questionDiv !== null &&
            answerDiv !== null &&
            typeof questionDiv !== "undefined" &&
            typeof answerDiv !== "undefined"
          ) {
            const questionQuill = Quill.find(questionDiv);
            const answerQuill = Quill.find(answerDiv);
            if (
              validateQuillContents(questionQuill) &&
              validateQuillContents(answerQuill)
            ) {
              // 2nd index is flag to determine correct answer. Will update when features are stabilized.
              const questionContents = JSON.stringify(
                questionQuill.getContents().ops,
              );
              const answerContents = JSON.stringify(
                answerQuill.getContents().ops,
              );
              const props = cards[i].props;
              newCardsList.push(
                <EditCard 
                  key={props.key}
                  id={props.id}
                  question={{id: props.id, question: questionContents}}
                  answers={[{id: props.id, isCorrect: true, answer: answerContents}]}
                  removeCard={removeCard}
                />
              );
            }
          }
        } else {
          newCardsList.push(cards[i]);
        }
      }
      return newCardsList;
    });
  }

  const saveCards = async (
    setMap: string,
  ): Promise<void> => {
    const response = await editSet(accessToken, setMap);
    if (response.ok) {
      router.push("/");
    } else if (response.status === 403) {
      const responseText = await response.text();
      alert(responseText);
    } else {
      try {
        const response = await getAccessToken(refreshToken);
        if (response.ok) {
          const textResponseJSON: AccessTokenResponse = await response.json();
          const secondTry = await editSet(textResponseJSON.accessToken, setMap);
          if (secondTry.ok) {
            router.push("/");
          } else if (response.status === 403) {
            const responseText = await response.text();
            alert(responseText);
          } else {
            alert("Set failed to save");
          }
        } else {
          router.push("/api/signout");
        }
      } catch (e) {
        router.push("/api/signout");
      }
    }
  };

  return (
    <>
      <div className="create-container">
        <h2 className="ml-3 my-3 text-xl">Create Flash Cards</h2>
        <div className="m-3">
          <input
            type="text"
            id="setName"
            placeholder="Name your set"
            className="w-full block rounded-lg py-2 px-3 border border-gray-300 bg-gray-50"
          />
        </div>
        <h3 className="ml-3 mb-3"></h3>
        <div>
          {cards.map((card, index) => (
            <div key={index}>{card}</div>
          ))}
        </div>
        <div className="my-3 text-center flex items-center justify-center">
          <div
            className="py-2 px-4 bg-cyan-500 rounded-xl cursor-pointer"
            onClick={() => {
              addCards();
            }}
          >
            Add a card
          </div>
        </div>
        <div className="my-3 text-center flex items-center justify-center">
          <div
            className="py-2 px-4 bg-cyan-500 rounded-xl cursor-pointer"
            onClick={async () => {
              const Quill = (await import("quill")).default;
              const setName = document.getElementById(
                "setName",
              ) as HTMLInputElement;
              const cardMapping: CardMapping[] = [];
              const editCardQuestion: CardQuestion[] = [];
              const editCardAnswer: CardAnswer[] = [];
              cards.forEach((card) => {
                const id = card.props.id;
                const questionDiv = document.getElementById(`question-${id}`);
                const answerDiv = document.getElementById(`answer-${id}`);
                if (
                  questionDiv !== null &&
                  answerDiv !== null &&
                  typeof questionDiv !== "undefined" &&
                  typeof answerDiv !== "undefined"
                ) {
                  const questionQuill = Quill.find(questionDiv);
                  const answerQuill = Quill.find(answerDiv);
                  if (
                    validateQuillContents(questionQuill) &&
                    validateQuillContents(answerQuill)
                  ) {
                    // 2nd index is flag to determine correct answer. Will update when features are stabilized.
                    const questionContents = JSON.stringify(
                      questionQuill.getContents().ops,
                    );
                    const answerContents = JSON.stringify(
                      answerQuill.getContents().ops,
                    );
                    if (oldVersionMapState.has(Number(id))) {
                      const oldVersionMapValue = oldVersionMapState.get(Number(id))
                      if (
                        JSON.stringify(
                          oldVersionMapValue?.question.question) !==
                            JSON.stringify(questionContents)
                      ) {
                        editCardQuestion.push({
                          questionId: oldVersionMapState.get(Number(id))?.question.id,
                          question: questionContents,
                        });
                      }
                      if (
                        JSON.stringify(
                          oldVersionMapValue?.answers[0].answer) !==
                            JSON.stringify(answerContents)
                      ) {
                        editCardAnswer.push({
                          answerId: oldVersionMapState.get(Number(id))?.answers[0].id,
                          answer: [answerContents],
                          answerIndex: 0
                        });
                      }
                    } else {
                      cardMapping.push({
                        question: questionContents, 
                        answer: [answerContents], 
                        answerIndex: 0
                      });
                    }
                  }
                }
              });
              if (set !== null) {
                set.name = setName.value;
                const cardMappingCombination = {
                  set,
                  editQuestion: editCardQuestion,
                  editAnswer: editCardAnswer,
                  new: cardMapping,
                  setUpdate: oldSetName !== set.name
                }
                void saveCards(JSON.stringify(cardMappingCombination));
              }
            }}
          >
            Submit
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCardList;
