"use client"

import { useRouter } from "next/navigation";

export default function Home() {
  const navigate = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <button onClick={() => navigate.push("/challenges")}>
        Go to challenges
      </button>
    </div>
  );
}
