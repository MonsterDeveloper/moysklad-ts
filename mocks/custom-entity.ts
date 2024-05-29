import { rest } from "msw";
import { MOYSKLAD_BASE_URL } from "./constants";

const ENDPOINT_URL = "/entity/customentity";

export default [
  rest.all(`${MOYSKLAD_BASE_URL}${ENDPOINT_URL}*`, (_, response, context) => {
    return response(
      context.status(200),
      context.json({ moysklad: "default mock", meta: { size: 100 } }),
    );
  }),
];
