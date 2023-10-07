import { rest } from "msw";
import { MOYSKLAD_BASE_URL } from "./constants";

import security from "./security";
import bonusTransaction from "./bonus-transaction";

export default [
  rest.all(MOYSKLAD_BASE_URL, (_, response, context) => {
    return response(
      context.status(200),
      context.json({ moysklad: "default api endpoint" }),
    );
  }),
  rest.get("https://example.com/api", (_, response, context) => {
    return response(context.status(200), context.json({ example: "api" }));
  }),
  ...security,
  ...bonusTransaction,
];
