"use client"

import { useRouter } from "next/navigation";

export default function CreatePhraseChallengePage() {
  const navigate = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <button onClick={() => navigate.push('/challenges')}>Back to beginning</button>
    </div>
  );
}
