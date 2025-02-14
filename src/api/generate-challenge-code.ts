import { random } from "lodash";

import { client } from "./client";

const codeExists = async (code: string) => {
  const { data } = await client.models.Challenge.list({
    filter: { challengeCode: { eq: code } },
  });

  return data.length > 0;
};

export const generateUniqueCode = async () => {
  let code;

  do {
    code = random(100000, 999999).toString();
  } while (await codeExists(code));

  return code;
};
