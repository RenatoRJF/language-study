import { useForm } from "react-hook-form";

import { CategoryFormProps } from "./CategoryForm.types";

export default function CategoryForm({ onSubmit }: CategoryFormProps) {
  const form = useForm({ defaultValues: { name: "" } });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register("name")} placeholder="Add a category name" />
      <button>Add</button>
    </form>
  );
}
