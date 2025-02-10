"use client";

import { Amplify } from "aws-amplify";
import { useForm } from "react-hook-form";
import { generateClient } from "aws-amplify/data";
import { useEffect, useRef, useState } from "react";

import Counter from "@/components/Counter/Counter";
import PhraseForm from "@/components/PhraseForm/PhraseForm";
import { PhraseFormData } from "@/components/PhraseForm/PhraseForm.types";

import outputs from "@/amplify_outputs.json";
import { Schema } from "@/amplify/data/resource";
import normalizeText from "@/utils/normalize-text";
// import { assignRandomValues } from "@/src/utils/add-random";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function PhraseChallengePage() {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm({ defaultValues: { answer: "" } });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [result, setResult] = useState({ correct: 0, wrong: 0 });
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [currentAnswer, setCurrentAnswer] = useState({
    answer: "",
    isCorrect: false,
    currentAnswer: "",
  });
  const [questions, setQuestions] = useState<Schema["Phrase"]["type"][]>([]);

  const validateQuestion = ({ answer }: PhraseFormData) => {
    form.reset();

    setIsLoading(true);

    setTimeout(() => {
      const translations = JSON.parse(
        Object(questions)[currentQuestion].translations
      );
      const correctAnswer = String(translations.nl);
      const isCorrect = normalizeText(correctAnswer) === normalizeText(answer);
      const resultKey = isCorrect ? "correct" : "wrong";

      setCurrentAnswer({
        answer,
        isCorrect,
        currentAnswer: correctAnswer,
      });

      setIsLoading(false);
      setResult((prev) => ({ ...prev, [resultKey]: prev[resultKey] + 1 }));
    }, 500);
  };

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  useEffect(() => {
    // assignRandomValues()

    client.models.Phrase.list({ limit: 5 }).then(({ data }) => {
      setQuestions(data);
      setIsLoading(false);
    });
  }, []);

  if (currentAnswer.currentAnswer) {
    const textColor = currentAnswer.isCorrect
      ? "text-green-500"
      : "text-red-500";

    return (
      <div className="min-h-svh justify-center items-center flex flex-col gap-8">
        <div className={`text-3xl text-gray-700 font-bold ${textColor}`}>
          {currentAnswer.answer}
        </div>

        <div className="text-3xl text-gray-700 font-bold">
          {currentAnswer.currentAnswer}
        </div>

        <button
          className="block text-white bg-blue-600 p-4 rounded-sm hover:opacity-90"
          onClick={() => {
            setCurrentQuestion((prev) => prev + 1);
            setCurrentAnswer({
              answer: "",
              currentAnswer: "",
              isCorrect: false,
            });
          }}
        >
          Continue
        </button>
      </div>
    );
  }

  if (!questions[currentQuestion] && !isLoading) {
    return (
      <div className="min-h-svh justify-center items-center flex flex-col gap-8">
        <div className="text-3xl text-gray-500">
          {`${result.correct} correct answers`}
        </div>

        <div className="text-3xl text-gray-500">
          {`${result.wrong} wrong answers`}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh justify-center items-center flex flex-col gap-8">
      {isLoading ? (
        <h1 className="text-5xl animate-bounce">Loading....</h1>
      ) : (
        <>
          <h3 className="text-3xl">
            {`${currentQuestion + 1} of ${questions.length}`}
          </h3>

          <Counter total={60} onCounterFinish={submitForm} />

          <PhraseForm
            form={form}
            ref={formRef}
            isLoading={isLoading}
            onSubmit={validateQuestion}
            question={Object(questions)[currentQuestion].text}
          />
        </>
      )}
    </div>
  );
}
