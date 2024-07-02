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

interface CardMapping {
  questionId?: number
  answerId?: number
  question: string
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
  const [cardNum, setCardNum] = useState(0);
  const [highestID, setHighestID] = useState(0);
  const [cards, setCards] = useState<React.JSX.Element[]>([]);
  const router = useRouter();
  const oldVersionMap = new Map<number, SetCardProps>();

  useEffect(() => {
    const flashcardsList: React.JSX.Element[] = [];
    flashcards.forEach((flashcard) => {
      const newCardNum = cardNum;
      setCardNum(cardNum + 1);
      flashcardsList.push(
        <EditCard
          key={(newCardNum + 1).toString()}
          id={flashcard.question.id.toString()}
          question={flashcard.question}
          answers={flashcard.answers}
          removeCard={removeCard}
        />,
      );
      oldVersionMap.set(flashcard.question.id, flashcard);
      setHighestID(Math.max(highestID, newCardNum + 1));
    });
    setCards(flashcardsList);
    setCardNum(highestID);
  }, []);

  function addCards(): void {
    if (cardNum < 700) {
      const newCardNum = cardNum;
      setCardNum(cardNum + 1);
      setCards([
        ...cards,
        <EditCard
          key={(newCardNum + 1).toString()}
          id={(newCardNum + 1).toString()}
          removeCard={removeCard}
          question={null}
          answers={[]}
        />,
      ]);
    } else {
      alert("A set has a maximum of 700 cards. Please create a new set.");
    }
  }

  function removeCard(id: string): void {
    setCards((cards) => {
      const newCardsList = [...cards];
      for (let i = 0; i < cards.length; ++i) {
        if (cards[i].props.id === id) {
          newCardsList.splice(i, 1);
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
    } else {
      try {
        const response = await getAccessToken(refreshToken);
        if (response.ok) {
          const textResponse = await response.text();
          const textResponseJSON: AccessTokenResponse =
            JSON.parse(textResponse);
          const secondTry = await editSet(textResponseJSON.accessToken, setMap);
          if (secondTry.ok) {
            router.push("/");
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
            value={set?.name}
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
              const editCardMapping: CardMapping[] = [];
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
                    if (oldVersionMap.has(Number(id))) {
                      const oldVersionMapValue = oldVersionMap.get(Number(id))
                      if (
                        JSON.stringify(
                          oldVersionMapValue?.question.question !==
                            questionContents,
                        ) &&
                        JSON.stringify(
                          oldVersionMapValue?.answers[0].answer !==
                            answerContents,
                        )
                      ) {
                        editCardMapping.push({
                          questionId: oldVersionMap.get(Number(id))?.question.id,
                          answerId: oldVersionMap.get(Number(id))?.answers[0].id,
                          question: questionContents,
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
                  edit: editCardMapping,
                  new: cardMapping
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
