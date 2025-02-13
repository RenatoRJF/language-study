"use client";

import { Amplify } from "aws-amplify";
import { useRouter } from "next/navigation";
import { generateClient } from "aws-amplify/api";

import outputs from "@/amplify_outputs.json";
import { useAppStore } from "@/src/store/app";
import { Schema } from "@/amplify/data/resource";
import JoinChallengeForm from "@/src/components/JoinChallengeForm/JoinChallengeForm";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function ChallengesPage() {
  const navigate = useRouter();
  const { user } = useAppStore();

  const handleJoinChallenge = (challengeCode: string) => {
    client.models.Challenge.list({
      filter: { challengeCode: { eq: challengeCode } },
    }).then(({ data }) => {
      const challenge = data.find((c) => c.challengeCode === challengeCode);

      if (challenge) {
        const users = Array.isArray(challenge.users)
          ? [...challenge.users, user]
          : [user];

        // Add user to challenge
        client.models.Challenge.update({ id: challenge.id, users }).then(() => {
          navigate.push(`/challenges/phrases/${challenge.id}`);
        });
      }
    });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
        <div>
          <JoinChallengeForm onSubmit={handleJoinChallenge} />
        </div>

        <h1 className="text-2xl mb-4">All challenges</h1>

        <div>
          <button onClick={() => navigate.push("/challenges/phrases")}>
            Phrase challenge
          </button>
        </div>

        <div>
          <button onClick={() => navigate.push("/challenges/phrases")}>
            Vocabulary challenge
          </button>
        </div>

        <div>
          <button onClick={() => navigate.push("/challenges/phrases")}>
            Text challenge
          </button>
        </div>

        <div>
          <button onClick={() => navigate.push("/challenges/phrases")}>
            Listening challenge
          </button>
        </div>
      </div>
    </div>
  );
}
