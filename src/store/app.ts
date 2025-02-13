import { create } from "zustand";
import { User } from "@/types/Schema";

export interface AppStore {
  user: User | null;
  loading: boolean;
  updateStore: (data: Partial<AppStore>) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  loading: true,
  updateStore: (data) => set((state) => ({ ...state, ...data })),
}));
