import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Category: a
    .model({
      name: a.string(),
    })
    .authorization((allow) =>
      allow.publicApiKey().to(["read", "create", "update", "delete"])
    ),

  User: a
    .model({
      username: a.string(),
    })
    .authorization((allow) =>
      allow.publicApiKey().to(["read", "create", "update"])
    ),

  Challenge: a
    .model({
      type: a.enum(["PHRASES", "VOCAB", "TEXT", "LISTENING"]),
      mode: a.enum(["INDIVIDUAL", "GROUP"]),
      users: a.json(),
      questions: a.json(),
      createdBy: a.string(),
      challengeCode: a.string(),
      totalQuestions: a.integer(),
    })
    .authorization((allow) =>
      allow.publicApiKey().to(["read", "create", "update"])
    ),

  Question: a
    .model({
      text: a.string(),
      random: a.float(),
      category: a.string(),
      translations: a.json(),
    })
    .authorization((allow) =>
      allow.publicApiKey().to(["read", "create", "update", "delete"])
    ),

  ChallengeProgress: a
    .model({
      result: a.json(),
      challengeId: a.string(),
      startedAt: a.timestamp(),
      finishedAt: a.timestamp(),
      currentQuestionIndex: a.integer(),
    })
    .authorization((allow) =>
      allow.publicApiKey().to(["read", "create", "update", "delete"])
    ),

  Answer: a
    .model({
      useId: a.string(),
      answer: a.string(),
      question: a.string(),
      isCorrect: a.boolean(),
      questionId: a.string(),
      challengeId: a.string(),
    })
    .authorization((allow) =>
      allow.publicApiKey().to(["read", "create", "update", "delete"])
    ),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
