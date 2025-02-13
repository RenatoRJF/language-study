import { Schema } from "@/amplify/data/resource";

export type ChallengePayload = Schema["Challenge"]["type"] & {
  category: string;
};

export interface ChallengeFormProps {
  onSubmit: (payload: ChallengePayload) => void;
}
