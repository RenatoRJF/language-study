import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  User: a.model({
    username: a.string()
  }).authorization((allow) => [
    allow.publicApiKey().to(["read", "create", "update"]),
  ]),
  Challenge: a.model({
    users: a.json(),
    result: a.json(),
    questions: a.json(),
  })
  .authorization((allow) => [
    allow.publicApiKey().to(["read", "create", "update"]),
  ]),
  Phrase: a
    .model({
      text: a.string(),
      random: a.float(),
      translations: a.json(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read", "create", "update", "delete"]),
    ]),
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
