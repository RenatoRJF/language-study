import React, { forwardRef } from "react";

import { PhraseFormProps } from "./PhraseForm.types";

const PhraseForm = forwardRef<HTMLFormElement, PhraseFormProps>(
  ({ question, isLoading, onSubmit, form }, ref) => {
    return (
      <form
        ref={ref}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-8 rounded-lg w-full max-w-[600px] shadow-md"
      >
        <h1 className="font-extrabold text-3xl text-gray-700 mb-4">
          {question}
        </h1>

        <input
          autoFocus
          autoComplete="off"
          placeholder="Type your answer"
          className="p-4 border border-gray-300 rounded-s w-full text-gray-700 font-semibold text-xl"
          {...form.register("answer")}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="block text-white bg-blue-600 p-4 rounded-sm hover:opacity-90"
          >
            {isLoading ? "Loading..." : "Submit answer"}
          </button>
        </div>
      </form>
    );
  }
);

PhraseForm.displayName = "PhraseForm";

export default PhraseForm;
