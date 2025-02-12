import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Category: a
    .model({
      id: a.id(),
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
      users: a.json(),
      result: a.json(),
      questions: a.json(),
      started: a.boolean(),
      finished: a.boolean(),
    })
    .authorization((allow) =>
      allow.publicApiKey().to(["read", "create", "update"])
    ),

  Phrase: a
    .model({
      text: a.string(),
      random: a.float(),
      translations: a.json(),
      categoryId: a.hasOne("Category", 'id'),
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
