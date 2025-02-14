"use client";

import { useRouter } from "next/navigation";

import { useAppStore } from "@/src/store/app";
import { generateUniqueCode, client } from "@/src/api";
import ChallengeForm from "@/src/components/ChallengeForm/ChallengeForm";
import { ChallengePayload } from "@/src/components/ChallengeForm/ChallengeForm.types";

export default function ChallengesPage() {
  const navigate = useRouter();
  const { user } = useAppStore();

  const handleCreateChallenge = async ({
    category,
    ...payload
  }: ChallengePayload) => {
    let payloadData = payload;

    // generate questions based on type
    if (payload.type === "PHRASES") {
      // get random questions based on category and random fields
      const questionsResponse = await client.models.Question.list({
        limit: Number(payload.totalQuestions) + 1,
        filter: { category: { eq: category }, random: { ge: Math.random() } },
      });

      if (questionsResponse.data) {
        const challengeCode = await generateUniqueCode();

        payloadData = {
          ...payloadData,
          challengeCode,
          users: JSON.stringify([user]),
          questions: JSON.stringify(questionsResponse.data),
        };
      }
    }

    client.models.Challenge.create(payloadData).then(({ data }) => {
      if (data) {
        client.models.ChallengeProgress.create({ challengeId: data.id }).then(
          () => navigate.push(`/challenges/phrases/${data.id}`)
        );
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
