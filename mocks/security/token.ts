import { rest } from "msw";
import { MOYSKLAD_BASE_URL } from "../constants";

export const securityTokenPost = rest.post(
  `${MOYSKLAD_BASE_URL}/security/token`,
  (_, response, context) =>
    response(context.json({ access_token: "supersecret" })),
);
