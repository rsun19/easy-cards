"use client";
import React, { useEffect, useState } from "react";
import Flashcard from "./flashcard";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { FaShuffle } from "react-icons/fa6";
import { Button, Divider, Flex, Modal, Text } from "@mantine/core";
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
  const [star, setStar] = useState(false);

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

  const showStarredQuestions = (): void => {
    const starred: React.JSX.Element[] = [];
    flashcardList.forEach((card) => {
      const props = card.props;
        if (props.question.star === true) {
          starred.push(card);
        }
    });
    if (starred.length === 0) {
      alert('You currently have no starred flashcards!');
    } else {
      setStar((star) => !star);
      setFlashcardList(starred);
      setFlashcardIdx(0);
      close();
    }
  }

  const hideStarredQuestions = (): void => {
    setCards();
    setStar((star) => !star);
    setFlashcardIdx(0);
    close();
  }

  const unshuffleFlashcards = (): void => {
    setCards();
    setFlashcardIdx(0);
    close();
  }

  const reverseFlashcardDirection = (): void => {
    setFlashcardList((cards) => cards.toReversed());
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
          <Modal size="auto" opened={opened} onClose={close} title="Settings" centered>
            <Flex 
              direction={{ base: 'column' }}
              gap={{ base: 'sm' }}
              justify={{ base: 'center' }}
            >
              <Button className="rounded-xl mb-2" onClick={() => {flipQuestionAnswer()}}>
                Flip Question and Answer order
              </Button>
              {!star && <Button className="rounded-xl mb-2" onClick={() => {showStarredQuestions()}}>
                Show starred flashcards
              </Button>}
              {star && <Button className="rounded-xl mb-2" onClick={() => {hideStarredQuestions()}}>
                Hide starred flashcards
              </Button>}
              <Button className="rounded-xl mb-2" onClick={() => {unshuffleFlashcards()}}>
                Unshuffle flashcards
              </Button>
              <Button className="rounded-xl mb-2" onClick={() => {reverseFlashcardDirection()}}>
                Reverse flashcards direction
              </Button>
            </Flex>
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
