"use client";

import React, { useEffect, useState } from "react";
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
}): React.JSX.Element => {
  const [showQuestion, setShowQuestion] = useState<boolean>(true);

  const flipCard = (): void => {
    const shouldShowQuestion = !showQuestion;
    setShowQuestion(shouldShowQuestion);
    const flashcard = document.getElementById("flashcard");
    const flashcardContent = document.getElementById("flashcard-content");
    if (flashcard !== null && flashcardContent !== null) {
      flashcard.classList.toggle("flip-card");
      flashcardContent.classList.toggle("flashcard-content-flip");
    }
  };

  useEffect(() => {
    window.katex = katex;
  }, []);

  useEffect(() => {
    const loadQuill = async (): Promise<void> => {
      const Quill = (await import("quill")).default;
      if (showQuestion) {
        const quillQuestion = new Quill(`#question-${question.id}`, {
          modules: {
            toolbar: false,
          },
          theme: "snow",
        });
        quillQuestion.setContents(JSON.parse(question.question) as Op[]);
        quillQuestion.disable();
      } else {
        const quillAnswer = new Quill(`#answer-${answers[0].id}`, {
          modules: {
            toolbar: false,
          },
          theme: "snow",
        });
        quillAnswer.setContents(JSON.parse(answers[0].answer) as Op[]);
        quillAnswer.disable();
      }
    };
    void loadQuill();
  }, [showQuestion]);

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
        {showQuestion && <div id={`question-${question.id}`} />}
        {!showQuestion &&
          (answers.length === 1 ? (
            <div>
              <div id={`answer-${answers[0].id}`}></div>
            </div>
          ) : (
            <div>Multiple choice answers are a work in progress...</div>
          ))}
      </div>
    </div>
  );
};

export default Flashcard;
