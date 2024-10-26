/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/card";
import { insertSet } from "../lib/insertSet";
import { getAccessToken } from "../lib/getAccessToken";
import { useRouter } from "next/navigation";
import { type AccessTokenResponse } from "@/types";
import "quill/dist/quill.snow.css";
import { validateQuillContents } from "../lib/utils";
import katex from 'katex';
import 'katex/dist/katex.min.css';

type CardMapping = [string, [string], number];

interface CreateProps {
  accessToken: string;
  refreshToken: string;
}

const Create: React.FC<CreateProps> = ({
  accessToken,
  refreshToken,
}): React.JSX.Element => {
  const [cardNum, setCardNum] = useState(0);
  const [cards, setCards] = useState<React.JSX.Element[]>([
    <Card key="0" id={0} removeCard={removeCard} question={null} answers={[]} />
  ]);
  const router = useRouter();
  
  useEffect(() => {
    window.katex = katex;
  }, [])

  function addCards(): void {
    if (cardNum < 700) {
      const newCardNum = cardNum;
      setCardNum(cardNum + 1);
      setCards([
        ...cards,
        <Card
          key={(newCardNum + 1).toString()}
          id={newCardNum + 1}
          removeCard={removeCard}
          question={null}
          answers={[]}
        />,
      ]);
    } else {
      alert("A set has a maximum of 700 cards. Please create a new set.");
    }
  }

  async function removeCard(id: number): Promise<void> {
    const Quill = (await import("quill")).default;
    setCards((cards) => {
      const newCardsList: React.JSX.Element[] = [];
      cards.forEach((card) => {
        if (card.props.id === id) {
          // do nothing
        } else if (card.props.question == null) {
          const questionDiv = document.getElementById(`question-${card.props.id}`);
          const answerDiv = document.getElementById(`answer-${card.props.id}`);
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
              const props = card.props;
              newCardsList.push(
                <Card 
                  key={props.id.toString()}
                  id={props.id}
                  question={{id: props.id, question: questionContents}}
                  answers={[{id: props.id, isCorrect: false, answer: answerContents}]}
                  removeCard={removeCard}
                />
              );
            }
          }
        } else {
          newCardsList.push(card);
        }
      });
      return newCardsList;
    });
  }

  const onSubmit = async (): Promise<void> => {
    const Quill = (await import("quill")).default;
    const setName = document.getElementById(
      "setName",
    ) as HTMLInputElement;
    const cardMapping: CardMapping[] = [];
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
          cardMapping.push([
            JSON.stringify(questionQuill.getContents().ops),
            [JSON.stringify(answerQuill.getContents().ops)],
            0,
          ]);
        }
      }
    });
    await saveCards(setName.value, cardMapping);
  }

  const saveCards = async (
    title: string,
    cards: CardMapping[],
  ): Promise<void> => {
    const setMap = {
      title,
      cards,
    };
    const response = await insertSet(accessToken, JSON.stringify(setMap));
    if (response.ok) {
      router.push("/sets");
    } else if (response.status === 403) {
      const responseText = await response.text();
      alert(responseText);
    } else {
      try {
        const response = await getAccessToken(refreshToken);
        if (response.ok) {
          const textResponseJSON: AccessTokenResponse = await response.json();
          const secondTry = await insertSet(
            textResponseJSON.accessToken,
            JSON.stringify(setMap),
          );
          if (secondTry.ok) {
            router.push("/sets");
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
            onClick={onSubmit}
          >
            Submit
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
