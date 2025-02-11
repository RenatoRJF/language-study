import { useForm } from "react-hook-form";

import { ChallengeFormProps } from "./ChallengeForm.types";

export default function ChallengeForm({ onSubmit }: ChallengeFormProps) {
  const form = useForm({ defaultValues: { type: "" } });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <select>
        <option>option</option>
      </select>
      <button>Add</button>
    </form>
  );
}
