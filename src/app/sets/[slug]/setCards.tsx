"use client";

import { type AccessTokenResponse, type AnswerType, type QuestionType } from "@/types";
import hljs from "highlight.js";
import React, { useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/github-dark.css";
import { type Op } from "quill/core";
import "./styles.css";
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { FaRegStar } from "react-icons/fa6";
import { modifyStarredQuestion } from "@/app/lib/modifyStarredQuestion";
import { useRouter } from "next/navigation";

interface SetCardProps {
  question: QuestionType;
  answers: AnswerType[];
  accessToken: string;
}

const SetCard: React.FC<SetCardProps> = ({
  question,
  answers,
  accessToken
},
): React.JSX.Element => {
  const router = useRouter();
  const [star, setStar] = useState(question.star ?? false);

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

  const modifyStarOnQuestion = async (): Promise<void> => {
    try {
      const response = await modifyStarredQuestion(accessToken, JSON.stringify({...question, star: !star}));
      if (!response.ok) {
          const textResponseJSON: AccessTokenResponse = await response.json();
          const secondTry = await modifyStarredQuestion(textResponseJSON.accessToken, JSON.stringify({...question, star: !star}));
          if (!secondTry.ok) {
            alert("Question failed to delete");
          }
        }
        setStar(!star);
      } catch (e) {
      router.push("/api/signout");
    }
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row mb-3">
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
      <div className="flex flex-row justify-between pr-3 pb-2">
        <div></div>
        {!star && <FaRegStar onClick={() => { void modifyStarOnQuestion() }} size={20} className="cursor-pointer" />}
        {star && <FaRegStar onClick={() => { void modifyStarOnQuestion() }} size={20} className="text-yellow-300 cursor-pointer" />}
      </div>
    </div>
  );
};

export default SetCard;
