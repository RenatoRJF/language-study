import { create } from "zustand";
import { Challenge } from "@/types/Schema";

export interface AppStore {
  activeChallenges: Challenge[]
  updateChallengeStore: (data: Partial<AppStore>) => void;
}

export const useChallengesStore = create<AppStore>((set) => ({
  activeChallenges: [],
  updateChallengeStore: (data) => set((state) => ({ ...state, ...data })),
}));
