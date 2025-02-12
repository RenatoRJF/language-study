"use client";

import { useRouter } from "next/navigation";

import ChallengeForm from "@/src/components/ChallengeForm/ChallengeForm";

export default function ChallengesPage() {
  const navigate = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
        <h1 className="text-2xl mb-4">Phrase Challenge</h1>

        <ChallengeForm
          onSubmit={() => {
            navigate.push("/challenges/phrases");
          }}
        />
      </div>
    </div>
  );
}
