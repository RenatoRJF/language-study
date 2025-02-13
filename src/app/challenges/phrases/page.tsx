"use client";

import { Amplify } from "aws-amplify";
import { useRouter } from "next/navigation";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";

import outputs from "@/amplify_outputs.json";
import ChallengeForm from "@/src/components/ChallengeForm/ChallengeForm";
import { ChallengePayload } from "@/src/components/ChallengeForm/ChallengeForm.types";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function ChallengesPage() {
  const navigate = useRouter();

  const handleCreateChallenge = async ({
    category,
    ...payload
  }: ChallengePayload) => {
    let payloadData = payload;

    // generate questions based on type
    if (payload.type === "PHRASES") {
      // generate questions based on category and totalQuestions
      // TODO: randomize questions
      const questionsResponse = await client.models.Question.list({
        limit: Number(payload.totalQuestions),
        filter: { category: { eq: category } },
      });

      if (questionsResponse.data) {
        payloadData = {
          ...payloadData,
          questions: JSON.stringify(questionsResponse.data),
        };
      }
    }

    client.models.Challenge.create(payloadData).then(({ data }) => {
      if (data) {
        navigate.push(`/challenges/phrases/${data.id}`);
      }
    });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
        <h1 className="text-2xl mb-4">Phrase Challenge</h1>

        <ChallengeForm onSubmit={handleCreateChallenge} />
      </div>
    </div>
  );
}
