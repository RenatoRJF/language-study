"use client";

import { useRouter } from "next/navigation";

export default function ChallengesPage() {
  const navigate = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <button onClick={() => navigate.push("/challenges/phrases")}>
        Phrase Challenge
      </button>
    </div>
  );
}
