"use client";
import React, { useEffect, useState } from "react";
import Flashcard from "./flashcard";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { FaShuffle } from "react-icons/fa6";
import { Button, Divider, Modal, Text } from "@mantine/core";
import { type GetFlashcardsType } from "@/app/lib/getFlashcards";
import { useDisclosure } from '@mantine/hooks';
import { IoSettingsOutline } from "react-icons/io5";

const FlashcardPage: React.FC<GetFlashcardsType> = ({
  flashcards,
}): React.JSX.Element => {
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [flashcardList, setFlashcardList] = useState<React.JSX.Element[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [, updateState] = React.useState<undefined | Record<string, any>>()
  const forceUpdate = React.useCallback(() => { updateState({}) }, []);

  const setCards = (): void => {
    const cards: React.JSX.Element[] = [];
    for (let i = 0; i < flashcards.length; i++) {
      cards.push(
        <Flashcard
          key={i}
          question={flashcards[i].question}
          answers={flashcards[i].answers}
          flipped={false}
        />,
      );
    }
    setFlashcardList(cards);
  };

  const flipQuestionAnswer = (): void => {
    setFlashcardList((cards) => {
      const flipped: React.JSX.Element[] = [];
      cards.forEach((card) => {
        const props = card.props;
        flipped.push(
          <Flashcard 
            question={props.question}
            answers={props.answers}
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            flipped={!props.flipped}
          />
        );
      });
      return flipped;
    });
    setFlashcardIdx(0);
    close();
  }

  const shuffleCards = (): void => {
    setFlashcardList((flashcardList) => {
      const cards = flashcardList;
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
      }
      return cards;
    });
    setFlashcardIdx(0);
    forceUpdate();
  };

  useEffect(() => {
    setCards();
  }, []);

  const moveToPrevFlashcard = (): void => {
    setFlashcardIdx((flashcardIdx) =>
      flashcardIdx > 0 ? flashcardIdx - 1 : flashcardIdx,
    );
  };

  const moveToNextFlashcard = (): void => {
    setFlashcardIdx((flashcardIdx) =>
      flashcardIdx < flashcardList.length - 1 ? flashcardIdx + 1 : flashcardIdx,
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "ArrowLeft") {
        moveToPrevFlashcard();
      } else if (e.key === "ArrowRight") {
        moveToNextFlashcard();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [flashcardList]);

  return (
    <>
      <div className="flex justify-between items-center mt-3 mx-5">
        <div></div>
        <Text className="text-center">
          Card: {flashcardIdx + 1}/{flashcardList.length}
        </Text>
        <div>
          <Modal opened={opened} onClose={close} title="Settings" centered>
            <Button className="rounded-xl" onClick={() => {flipQuestionAnswer()}}>
              Flip Question and Answer order
            </Button>
          </Modal>
          <Button className="rounded-xl bg-black" onClick={open}>
            <IoSettingsOutline />
          </Button>
        </div>
      </div>
      <div className="m-5" style={{ height: "75vh" }}>
        {flashcardList[flashcardIdx]}
      </div>
      <div className="flex flex-row mb-5">
        <div
          style={{ backgroundColor: "darkseagreen", color: "white" }}
          className="basis-11/12 mx-5 max-w-full rounded-xl overflow-hidden shadow-lg text-xl"
        >
          <div className="py-3 flex items-stretch justify-evenly">
            <div className="cursor-pointer" onClick={moveToPrevFlashcard}>
              <MdNavigateBefore />
            </div>
            <Divider orientation="vertical" />
            <div className="cursor-pointer" onClick={moveToNextFlashcard}>
              <MdNavigateNext />
            </div>
          </div>
        </div>
        <div
          onClick={shuffleCards}
          className="cursor-pointer flex justify-center items-center basis-1/12 mr-5 max-w-full rounded-xl overflow-hidden shadow-lg text-xl"
          style={{ backgroundColor: "darkseagreen", color: "white" }}
        >
          <FaShuffle />
        </div>
      </div>
    </>
  );
};

export default FlashcardPage;
