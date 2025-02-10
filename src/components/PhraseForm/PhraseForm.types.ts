import { UseFormReturn } from "react-hook-form";

export  interface PhraseFormData {
  answer: string;
}

export interface PhraseFormProps {
  question: string;
  isLoading: boolean;
  form: UseFormReturn<PhraseFormData>
  onSubmit: (data: PhraseFormData) => void;
}
