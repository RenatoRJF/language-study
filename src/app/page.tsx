"use client";

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { FormEvent, useEffect, useState } from "react";

import outputs from "@/amplify_outputs.json";
import { Schema } from "@/amplify/data/resource";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function Home() {
  const [phrases, setPhrases] = useState<Array<Schema["Phrase"]["type"]>>([]);

  const listPhrases = () => {
    client.models.Phrase.observeQuery().subscribe({
      next: (data) => setPhrases([...data.items]),
    });
  };

  const handleAddPhrase = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    client.models.Phrase.create({
      text: "Minha casa é grande",
      translations: {
        en: "My house is big",
        de: "Mein Haus ist groß",
        nl: "Mijn huis is groot",
      },
    });
  };

  useEffect(() => {
    listPhrases();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1>Add Phrase</h1>

      <form onSubmit={handleAddPhrase} className="bg-white">
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />

        <button className="bg-blue-700 text-white" type="submit">
          Add
        </button>
      </form>

      <ul>
        {phrases.map((phrase) => (
          <li key={phrase.id} className="bg-red-200">
            {phrase.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
