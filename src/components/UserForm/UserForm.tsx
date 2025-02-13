import { useForm } from "react-hook-form";

import { UserFormProps } from "./UserForm.types";

import { User } from "@/src/types/Schema";

export default function UserForm({ onSubmit }: UserFormProps) {
  const form = useForm<User>({ defaultValues: { username: "" } });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register("username")} placeholder="Enter your username" />
      <button>Add</button>
    </form>
  );
}
