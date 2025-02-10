import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

import outputs from "@/amplify_outputs.json";
import { Schema } from "@/amplify/data/resource";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export async function assignRandomValues() {
  const phrases = await client.models.Phrase.list();

  phrases.data.forEach(async (phrase) => {
    await client.models.Phrase.update({
      id: phrase.id,
      random: Math.random(),
    });
  });
}

assignRandomValues();
