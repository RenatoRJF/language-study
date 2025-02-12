"use client"

import { useRouter } from "next/navigation";

export default function CreatePhraseChallengePage() {
  const navigate = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <button onClick={() => navigate.push('/challenges/phrases/abc/result')}>Start</button>
    </div>
  );
}
