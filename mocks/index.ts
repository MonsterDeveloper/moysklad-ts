import { rest } from "msw";
import { MOYSKLAD_BASE_URL } from "./constants";

import security from "./security";
import bonusTransaction from "./bonus-transaction";
import demand from "./demand";
import batchGet from "./batch-get";
import counterparty from "./counterparty";
import customerOrder from "./customer-order";
import customEntity from "./custom-entity";
import product from "./product";
import variant from "./variant";
import report from "./report";

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
  rest.get("https://example.com/error", (_, response, context) => {
    return response(context.status(400), context.json({ sample: "error" }));
  }),
  batchGet,
  ...security,
  ...bonusTransaction,
  ...demand,
  ...counterparty,
  ...customerOrder,
  ...customEntity,
  ...product,
  ...variant,
  ...report,
];
