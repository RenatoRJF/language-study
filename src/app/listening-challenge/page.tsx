"use client";

import { useRef } from "react";
import { alphabetAudios } from "@/constants/alphabet-audios";

export default function PhraseChallengePage() {
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      {Object.entries(alphabetAudios).map(([key, src]) => (
        <div key={key} className="flex items-center gap-4">
          <audio
            ref={(el) => {
              audioRefs.current[key] = el;
            }}
          >
            <source src={src} type="audio/mpeg" />
          </audio>

          <button
            onClick={() => audioRefs.current[key]?.play()}
            className="py-3 px-4 bg-blue-700 text-white font-semibold rounded-md text-xl"
          >
            Play
          </button>
        </div>
      ))}
    </div>
  );
}
