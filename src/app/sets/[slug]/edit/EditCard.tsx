"use client"

/* eslint-disable @typescript-eslint/no-misused-promises */
import { FiTrash } from "react-icons/fi";
import React, { useEffect } from "react";
import hljs from "highlight.js";
import "./styles.css";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/github-dark.css";
import { type QuestionType, type AnswerType } from "@/types";
import { type Op } from "quill/core";
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface CardProps {
  id: string;
  question: QuestionType | null;
  answers: AnswerType[];
  removeCard: (id: string) => Promise<void>;
}

const formats = [
  "background",
  "bold",
  "color",
  "font",
  "code",
  "italic",
  "size",
  "strike",
  "script",
  "underline",
  "blockquote",
  "header",
  "indent",
  "list",
  "align",
  "direction",
  "code-block",
  "formula",
];

const EditCard: React.FC<CardProps> = ({
  id,
  question,
  answers,
  removeCard,
}) => {
  useEffect(() => {
    window.katex = katex;
    const loadQuill = async (): Promise<void> => {
      const Quill = (await import("quill")).default;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const quillQuestion = new Quill(`#question-${id}`, {
        modules: {
          syntax: { hljs },
          toolbar: [
            [{ header: [1, 2, false] }],
            [
              "bold",
              "italic",
              "underline",
              { list: "ordered" },
              { list: "bullet" },
            ],
            ["blockquote", "code-block", "formula"],
          ],
        },
        placeholder: "Compose an epic...",
        theme: "snow",
        formats,
      });
      if (question !== null) {
        quillQuestion.setContents(JSON.parse(question.question) as Op[]);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const quillAnswer = new Quill(`#answer-${id}`, {
        modules: {
          syntax: { hljs },
          toolbar: [
            [{ header: [1, 2, false] }],
            [
              "bold",
              "italic",
              "underline",
              { list: "ordered" },
              { list: "bullet" },
            ],
            ["blockquote", "code-block", "formula"],
          ],
        },
        placeholder: "Compose an epic...",
        theme: "snow",
        formats,
      });
      if (answers.length > 0) {
        quillAnswer.setContents(JSON.parse(answers[0].answer) as Op[]);
      }
    };
    void loadQuill();
  }, []);

  return (
    <div className="m-3 p-5 shadow-sm rounded-xl mb-5 border border-gray-300">
      <div className="flex flex-col lg:flex-row gap-6 mb-6 lg:mb-24">
        <div className="basis-1/2">
          <div className="text-xl mb-1">Term</div>
          <div id={`question-${id}`}></div>
        </div>
        <div className="basis-1/2">
          <div className="text-xl mb-1">Definition</div>
          <div id={`answer-${id}`}></div>
        </div>
      </div>
      <FiTrash
        size={30}
        className="cursor-pointer"
        onClick={async () => {
          await removeCard(id);
        }}
      />
    </div>
  );
};

export default EditCard;
