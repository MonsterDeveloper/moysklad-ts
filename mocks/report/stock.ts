import { rest } from "msw";
import { MOYSKLAD_BASE_URL } from "../constants";

export const stockAll = rest.get(
  `${MOYSKLAD_BASE_URL}/report/stock/all`,
  (_, response, context) => response(context.json({ rows: [] })),
);

export const stockAllCurrent = rest.get(
  `${MOYSKLAD_BASE_URL}/report/stock/all/current`,
  (_, response, context) =>
    response(context.json([{ assortmentId: "asd", quantity: 1 }])),
);
