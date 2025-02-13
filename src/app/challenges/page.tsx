"use client";

import { useRouter } from "next/navigation";

export default function ChallengesPage() {
  const navigate = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
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
