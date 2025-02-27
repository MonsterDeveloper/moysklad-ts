import { rest } from "msw";
import { MOYSKLAD_BASE_URL } from "./constants";

const ENDPOINT_URL = `${MOYSKLAD_BASE_URL}/wizard`;

export default [
  rest.post(`${ENDPOINT_URL}/:entity`, (request, response, context) => {
    const { entity } = request.params;

    return response(
      context.status(200),
      context.json({ meta: { type: entity } }),
    );
  }),
];
