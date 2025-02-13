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
      result: a.json(),
      questions: a.json(),
      started: a.boolean(),
      finished: a.boolean(),
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
