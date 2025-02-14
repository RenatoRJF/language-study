"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

import { client } from "@/api";
import { useAppStore } from "@/store/app";
import { AppProviderProps } from "./AppProvider.types";

export default function AppProvider({ children }: AppProviderProps) {
  const { user, loading, updateStore } = useAppStore();

  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    const isBasePath = window.location.pathname === "/";

    if (userId && !user) {
      client.models.User.get({ id: String(userId) })
        .then(({ data }) => updateStore({ user: data, loading: false }))
        .catch(() => console.log("Failed to get user "));
    } else if (user && isBasePath) {
      setTimeout(() => redirect("/challenges"));
    } else if (!isBasePath && !user) {
      setTimeout(() => redirect("/"));
      setTimeout(() => updateStore({ loading: false }), 100);
    } else {
      updateStore({ loading: false });
    }
  }, [updateStore, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
