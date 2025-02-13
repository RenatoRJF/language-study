import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

import outputs from "@/amplify_outputs.json";
import { Schema } from "@/amplify/data/resource";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export async function assignRandomValues() {
  const phrases = await client.models.Question.list();

  phrases.data.forEach(async (phrase) => {
    await client.models.Question.update({
      id: phrase.id,
      random: Math.random(),
    });
  });
}

assignRandomValues();
