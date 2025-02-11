import { useForm } from "react-hook-form";

import { UserFormProps } from "./UserForm.types";

export default function UserForm({ onSubmit }: UserFormProps) {
  const form = useForm({ defaultValues: { name: "" } });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register("name")} placeholder="Enter your name" />
      <button>Add</button>
    </form>
  );
}
