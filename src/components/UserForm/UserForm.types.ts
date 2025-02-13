import { Schema } from "@/amplify/data/resource";

export interface UserFormProps {
  onSubmit: (payload: Schema['User']['type']) => void;
}
