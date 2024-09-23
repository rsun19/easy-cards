"use client";

import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { type SetCardProps } from "@/types";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/github-dark.css";
import { type Op } from "quill/core";
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Flashcard: React.FC<SetCardProps> = ({
  question,
  answers,
  flipped
}): React.JSX.Element => {
  const [showQuestion, setShowQuestion] = useState<boolean>(flipped !== true);
  const questionRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  const flipCard = (): void => {
    const shouldShowQuestion = !showQuestion;
    setShowQuestion(shouldShowQuestion);
    const flashcard = document.getElementById("flashcard");
    const flashcardContent = document.getElementById("flashcard-content");
    if (flashcard !== null && flashcardContent !== null) {
      flashcard.classList.toggle("flip-card");
      flashcardContent.classList.toggle("flashcard-content-flip");
    }
    if (shouldShowQuestion && questionRef.current !== null && answerRef.current !== null) {
      questionRef.current.style.display = 'block';
      answerRef.current.style.display = 'none';
    } else if (!shouldShowQuestion && questionRef.current !== null && answerRef.current !== null) {
      questionRef.current.style.display = 'none';
      answerRef.current.style.display = 'block';
    }
  };

  const getCardContents = async (shouldShowQuestion: boolean): Promise<void> => {
    if (shouldShowQuestion && questionRef.current !== null && answerRef.current !== null) {
      questionRef.current.style.display = 'block';
      answerRef.current.style.display = 'none';
    } else if (!shouldShowQuestion && questionRef.current !== null && answerRef.current !== null) {
      questionRef.current.style.display = 'none';
      answerRef.current.style.display = 'block';
    }
    const Quill = (await import("quill")).default;
    const quillQuestion = new Quill(`#question-${question.id}`, {
      modules: {
        toolbar: false,
      },
      theme: "snow",
    });
    quillQuestion.setContents(JSON.parse(question.question) as Op[]);
    quillQuestion.disable();
    const quillAnswer = new Quill(`#answer-${answers[0].id}`, {
      modules: {
        toolbar: false,
      },
      theme: "snow",
    });
    quillAnswer.setContents(JSON.parse(answers[0].answer) as Op[]);
    quillAnswer.disable();
  }

  useEffect(() => {
    window.katex = katex;
  }, [])

  useEffect(() => {
    void getCardContents(flipped !== true);
  }, [question, answers, flipped]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        flipCard();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showQuestion]);

  return (
    <div
      id="flashcard"
      className="max-w-full cursor-pointer rounded-xl overflow-hidden flashcard"
      style={{
        height: "100%",
        backgroundColor: "darkseagreen",
        color: "white",
      }}
      onClick={flipCard}
    >
      <div id="flashcard-content">
        <div id={`question-${question.id}`} ref={questionRef} />
        {(answers.length === 1 ? (
            <div>
              <div id={`answer-${answers[0].id}`} ref={answerRef}></div>
            </div>
          ) : (
            <div>Multiple choice answers are a work in progress...</div>
        ))}
      </div>
    </div>
  );
};

export default Flashcard;
