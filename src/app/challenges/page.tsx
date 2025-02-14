"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { client } from "@/src/api";
import { useAppStore } from "@/src/store/app";
import { useChallengesStore } from "@/src/store/challenges";
import JoinChallengeForm from "@/src/components/JoinChallengeForm/JoinChallengeForm";

export default function ChallengesPage() {
  const navigate = useRouter();
  const { user } = useAppStore();
  const { activeChallenges, updateChallengeStore } = useChallengesStore();

  const handleJoinChallenge = (challengeCode: string) => {
    const challenge = activeChallenges.find(
      (c) => c.challengeCode === challengeCode
    );

    if (challenge) {
      const users = JSON.parse(String(challenge.users));

      // Add user to challenge
      client.models.Challenge.update({
        id: challenge.id,
        users: JSON.stringify(Array.isArray(users) ? [...users, user] : [user]),
      }).then(() => {
        navigate.push(`/challenges/phrases/${challenge.id}`);
      });
    }
  };

  useEffect(() => {
    client.models.Challenge.observeQuery().subscribe({
      next: (data) => {
        updateChallengeStore({ activeChallenges: data.items });
      },
    });
  }, [updateChallengeStore]);

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
