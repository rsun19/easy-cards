"use client";

import { type AnswerType, type QuestionType } from "@/types";
import hljs from "highlight.js";
import React, { useEffect } from "react";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/github-dark.css";
import { type Op } from "quill/core";
import "./styles.css";
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface SetCardProps {
  question: QuestionType;
  answers: AnswerType[];
}

const SetCard: React.FC<SetCardProps> = ({
  question,
  answers,
}): React.JSX.Element => {
  useEffect(() => {
    window.katex = katex;
    const loadQuill = async (): Promise<void> => {
      const Quill = (await import("quill")).default;
      const quillQuestion = new Quill(`#question-${question.id}`, {
        modules: {
          syntax: { hljs },
          toolbar: false,
        },
        theme: "snow",
      });
      quillQuestion.setContents(JSON.parse(question.question) as Op[]);
      quillQuestion.disable();
      const quillAnswer = new Quill(`#answer-${answers[0].id}`, {
        modules: {
          syntax: { hljs },
          toolbar: false,
        },
        theme: "snow",
      });
      quillAnswer.setContents(JSON.parse(answers[0].answer) as Op[]);
      quillAnswer.disable();
    };
    void loadQuill();
  }, []);

  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <div className="basis-1/2 ml-3 lg:ml-6 mr-3 py-3">
          <div id={`question-${question.id}`}></div>
        </div>
        {answers.length === 1 ? (
          <div className="basis-1/2 ml-3 mr-3 lg:mr-6 py-3">
            <div id={`answer-${answers[0].id}`}></div>
          </div>
        ) : (
          <div className="basis-1/2 ml-3 mr-3 lg:mr-6 p-5 shadow-sm rounded-xl mb-5 border border-gray-300">
            Multiple choice answers are a work in progress...
          </div>
        )}
      </div>
    </div>
  );
};

export default SetCard;
