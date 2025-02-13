"use client";

import { Amplify } from "aws-amplify";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { generateClient } from "aws-amplify/api";

import outputs from "@/amplify_outputs.json";
import { Schema } from "@/amplify/data/resource";

Amplify.configure(outputs);

const client = generateClient<Schema>();

type User = Schema["User"]["type"];
type Question = Schema["Question"]["type"];
type Challenge = Schema["Challenge"]["type"];
type ChallengeProgress = Schema["ChallengeProgress"]["type"];

// const result = [
//   { username: "user1", correct: 4 },
//   { username: "user2", correct: 8 },
// ];

export default function CreatePhraseChallengePage() {
  const { challengeId = "" } = useParams();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [challenge, setChallenge] = useState<Challenge>();
  const [progress, setProgress] = useState<ChallengeProgress>();

  const handleStartChallenge = () => {
    client.models.ChallengeProgress.update({
      startedAt: Date.now(),
      id: String(challengeId),
      challengeId: String(challengeId),
    });
  };

  const handleFinishChallenge = () => {
    client.models.ChallengeProgress.update({
      finishedAt: Date.now(),
      id: String(challengeId),
      challengeId: String(challengeId),
    });
  };

  const handleAddUser = (user: User) => {
    const users = JSON.stringify(
      Array.isArray(challenge?.users) ? [...challenge.users, user] : [user]
    );

    client.models.Challenge.update({ id: String(challengeId), users });
  };

  useEffect(() => {
    if (!challenge && challengeId) {
      client.models.Challenge.observeQuery().subscribe({
        next: (res) => {
          const data = res.items.find(
            (item) => String(item.id) === challengeId
          );

          if (data) {
            const questions = JSON.parse(String(data.questions)) as Question[];

            setChallenge({
              ...data,
              questions: questions.map((question) => ({
                ...question,
                translations: JSON.parse(String(question.translations)),
              })),
              users: data.users ? JSON.parse(String(data.users)) : data.users,
            });
          }
        },
      });
    }
  }, [challengeId, challenge]);

  useEffect(() => {
    if (!progress && challengeId) {
      client.models.ChallengeProgress.observeQuery().subscribe({
        next: (res) => {
          const data = res.items.find(
            (item) => String(item.challengeId) === challengeId
          );

          if (data) {
            setProgress(data);
          }
        },
      });
    }
  }, [challengeId, progress]);

  useEffect(() => {
    client.models.User.observeQuery().subscribe({
      next: (res) => setAllUsers(res.items),
    });
  }, []);

  if (!challenge || !progress) {
    return <div>Loading...</div>;
  }

  const isGroupMode = challenge.mode === "GROUP";
  const disabledStartBtn =
    isGroupMode &&
    ((Array.isArray(challenge.users) && challenge.users.length < 2) ||
      !challenge.users);

  if (!progress.startedAt) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div>
          <span>{`Mode: ${challenge?.mode}`}</span>
        </div>

        {isGroupMode && allUsers.length > 0 && (
          <div>
            {allUsers.map((user) => (
              <button key={user.id} onClick={() => handleAddUser(user)}>
                {user.username}
              </button>
            ))}
          </div>
        )}

        <button disabled={disabledStartBtn} onClick={handleStartChallenge}>
          Start
        </button>
      </div>
    );
  }

  if (progress.finishedAt) {
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
      <div>Ongoing....</div>

      <div>
        <h3>User answer question</h3>

        {allUsers.map((user) => (
          <button key={user.id} onClick={handleStartChallenge}>
            {user.username}
          </button>
        ))}
      </div>

      <button disabled={disabledStartBtn} onClick={handleFinishChallenge}>
        finish challenge
      </button>
    </div>
  );
}
