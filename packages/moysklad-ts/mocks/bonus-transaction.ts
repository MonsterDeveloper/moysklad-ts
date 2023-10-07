import { rest } from "msw";
import { MOYSKLAD_BASE_URL } from "./constants";

export default [
  rest.all(
    `${MOYSKLAD_BASE_URL}/entity/bonustransaction*`,
    (_, response, context) => {
      return response(
        context.status(200),
        context.json({ moysklad: "default mock", meta: { size: 100 } }),
      );
    },
  ),
];
