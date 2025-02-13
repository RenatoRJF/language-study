"use client";

import { Amplify } from "aws-amplify";
import { redirect } from "next/navigation";
import { generateClient } from "aws-amplify/api";

import { User } from "@/types/Schema";
import { useAppStore } from "@/store/app";
import outputs from "@/amplify_outputs.json";
import { Schema } from "@/amplify/data/resource";
import UserForm from "@/components/UserForm/UserForm";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function Home() {
  const { updateStore } = useAppStore();

  const handleCreateUser = (payload: User) => {
    client.models.User.create(payload).then(({ data }) => {
      if (data) {
        localStorage.setItem("userId", data.id);
        updateStore({ user: data });
        redirect("/challenges");
      }
    });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1>Welcome</h1>

      <UserForm onSubmit={handleCreateUser} />
    </div>
  );
}
