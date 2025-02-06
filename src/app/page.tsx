"use client";

import { z } from "zod";
import { Amplify } from "aws-amplify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { zodResolver } from "@hookform/resolvers/zod";

import outputs from "@/amplify_outputs.json";
import { Schema } from "@/amplify/data/resource";

Amplify.configure(outputs);

const client = generateClient<Schema>();

type TranslationKeys = "nl";

type Translation = {
  [key in TranslationKeys]: string;
};

interface Phrase {
  text: string;
  translations: Translation;
}

const formSchema = z.object({
  text: z.string().min(1).max(255),
  translations: z.object({
    nl: z.string().min(1).max(255),
  }),
});

export default function Home() {
  const form = useForm<Phrase>({ resolver: zodResolver(formSchema) });

  const [phrases, setPhrases] = useState<Array<Schema["Phrase"]["type"]>>([]);

  const listPhrases = () => {
    client.models.Phrase.observeQuery().subscribe({
      next: (data) => setPhrases([...data.items]),
    });
  };

  const handleAddPhrase = ({ text, translations }: Phrase) => {
    client.models.Phrase.create({
      text,
      translations: JSON.stringify({ ...translations }),
    }).then(() => form.reset());
  };

  useEffect(() => {
    listPhrases();
  }, []);

  return (
    <div className="h-screen py-12">
      <form
        onSubmit={form.handleSubmit(handleAddPhrase)}
        className="flex flex-col gap-4 w-full max-w-[600px] m-auto"
      >
        <h1 className="text-4xl text-left w-full">Add Phrase</h1>

        <input
          type="text"
          placeholder="Portuguese text"
          className="border border-gray-400 p-4 rounded-md text-lg"
          {...form.register("text")}
        />

        <input
          type="text"
          placeholder="Dutch translation"
          className="border border-gray-400 p-4 rounded-md text-lg"
          {...form.register("translations.nl")}
        />

        <button
          className="bg-blue-700 text-white block py-3 px-4 rounded-md text-lg"
          type="submit"
        >
          Add
        </button>
      </form>

      <ul className="w-full max-w-[600px] text-left mt-6 mx-auto">
        {phrases.map((phrase, index) => (
          <li key={phrase.id} className="text-lg">
            {`${index + 1} - ${phrase.text}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
