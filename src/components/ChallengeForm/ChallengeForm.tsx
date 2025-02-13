import { Amplify } from "aws-amplify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";

import outputs from "@/amplify_outputs.json";
import { Schema } from "@/amplify/data/resource";

import { ChallengeFormProps } from "./ChallengeForm.types";

Amplify.configure(outputs);

const client = generateClient<Schema>();

type ChallengePayload = Schema["Challenge"]["type"] & {
  category: string;
};

type Mode = Schema["Challenge"]["type"]["mode"];

const questionsAmount = [3, 5, 10];

export default function ChallengeForm({ onSubmit }: ChallengeFormProps) {
  const [categories, setCategories] = useState<Schema["Category"]["type"][]>(
    []
  );

  const form = useForm<ChallengePayload>({
    defaultValues: {
      category: "",
      type: "PHRASES",
      mode: "INDIVIDUAL",
      totalQuestions: 3,
    },
  });

  useEffect(() => {
    client.models.Category.list().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 min-w-[400px] shadow p-6"
    >
      <div className="">
        <select
          id="select"
          value={form.watch("category")}
          className="p-2 border rounded-lg shadow-md"
          onChange={(e) => form.setValue("category", e.target.value)}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((option) => (
            <option key={option.id} value={String(option.name)}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="INDIVIDUAL"
            checked={form.watch("mode") === "INDIVIDUAL"}
            onChange={(e) => form.setValue("mode", e.target.value as Mode)}
          />
          <span>Individual</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            value="GROUP"
            type="radio"
            checked={form.watch("mode") === "GROUP"}
            onChange={(e) => form.setValue("mode", e.target.value as Mode)}
          />
          <span>Group</span>
        </label>
      </div>

      <div>
        <select
          id="select"
          className="p-2 border rounded-lg shadow-md"
          value={String(form.watch("totalQuestions"))}
          onChange={(e) =>
            form.setValue("totalQuestions", Number(e.target.value))
          }
        >
          <option value="" disabled>
            Select a category
          </option>
          {questionsAmount.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button type="submit">Create challenge</button>
      </div>
    </form>
  );
}
