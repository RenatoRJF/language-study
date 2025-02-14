"use client";

import { Amplify } from "aws-amplify";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { generateClient } from "aws-amplify/api";

import outputs from "@/amplify_outputs.json";
import { Schema } from "@/amplify/data/resource";
import { useAppStore } from "@/src/store/app";

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
  const { user } = useAppStore();
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

  const users = (challenge.users as Array<User>) ?? [];

  if (!progress.startedAt) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div>
          <span>{`Mode: ${challenge.mode}`}</span>
          {isGroupMode && (
            <span>{`Challenge code: ${challenge.challengeCode}`}</span>
          )}
        </div>

        {isGroupMode && (
          <div>
            {users.map((availableUser) => {
              if (availableUser.id !== user?.id) {
                return (
                  <button
                    key={availableUser.id}
                    onClick={() => handleAddUser(availableUser)}
                    className="flex items-center gap-2"
                  >
                    <span>
                      {users.some((u) => u.id === availableUser.id) && `✅`}
                    </span>
                    <span>{availableUser.username}</span>
                  </button>
                );
              }
              return null;
            })}
          </div>
        )}

        {isGroupMode && (
          <div className="min-w-[400px] bg-gray-100 py-2 px-4">
            <h3 className="text-lg font-semibold">Invite user</h3>

            {allUsers.map((availableUser) => {
              const hasJoined = users.some((u) => u.id === availableUser.id);

              if (availableUser.id !== user?.id && !hasJoined) {
                return (
                  <button
                    key={availableUser.id}
                    onClick={() => handleAddUser(availableUser)}
                    className="flex items-center gap-2"
                  >
                    <span>{availableUser.username}</span>
                  </button>
                );
              }
              return null;
            })}
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
