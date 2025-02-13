"use client";

import { Amplify } from "aws-amplify";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { useParams, useRouter } from "next/navigation";

import outputs from "@/amplify_outputs.json";
import { Schema } from "@/amplify/data/resource";

Amplify.configure(outputs);

const client = generateClient<Schema>();

type Question = Schema["Question"]["type"];

export default function CreatePhraseChallengePage() {
  const navigate = useRouter();
  const { challengeId = "" } = useParams();
  const [challenge, setChallenge] = useState<Schema["Challenge"]["type"]>();

  useEffect(() => {
    if (!challenge && challengeId) {
      const id = String(challengeId);

      client.models.Challenge.get({ id }).then(({ data }) => {
        if (data) {
          const questions = JSON.parse(String(data.questions)) as Question[];

          setChallenge({
            ...data,
            questions: questions.map((question) => ({
              ...question,
              translations: JSON.parse(String(question.translations)),
            })),
          });
        }
      });
    }
  }, [challengeId, challenge]);

  console.log(challenge);

  if (!challenge) {
    return <div>Loading...</div>;
  }

  const disabledStartBtn =
    challenge.mode === "GROUP" &&
    ((Array.isArray(challenge.users) && challenge.users.length < 2) ||
      !challenge.users);

  if (!challenge.started) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div>
          <span>{`Mode: ${challenge?.mode}`}</span>
        </div>
        <button
          disabled={disabledStartBtn}
          onClick={() => navigate.push("/challenges/phrases/abc/result")}
        >
          Start
        </button>
      </div>
    );
  }

  if (challenge.finished) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div>
          <span>Challenge finished</span>
        </div>

        <div>Show results here</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
        <span>{`Mode: ${challenge?.mode}`}</span>
      </div>
      <button
        disabled={disabledStartBtn}
        onClick={() => navigate.push("/challenges/phrases/abc/result")}
      >
        Start
      </button>
    </div>
  );
}
