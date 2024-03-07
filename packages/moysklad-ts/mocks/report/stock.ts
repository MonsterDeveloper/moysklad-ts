import { rest } from "msw";
import { MOYSKLAD_BASE_URL } from "../constants";

export const stock = rest.get(
  `${MOYSKLAD_BASE_URL}/report/stock/all`,
  (_, response, context) => response(context.json({ rows: [] })),
);
