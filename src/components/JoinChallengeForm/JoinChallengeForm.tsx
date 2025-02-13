import { useForm } from "react-hook-form";

import { JoinChallengeFormProps } from "./JoinChallengeForm.types";

export default function JoinChallengeForm({
  onSubmit,
}: JoinChallengeFormProps) {
  const form = useForm({ defaultValues: { challengeCode: "" } });

  return (
    <form
      onSubmit={form.handleSubmit(({ challengeCode }) =>
        onSubmit(challengeCode)
      )}
    >
      <input
        {...form.register("challengeCode")}
        placeholder="Type the challenge code"
      />
      <button>Join challenge</button>
    </form>
  );
}
