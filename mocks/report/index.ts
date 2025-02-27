import { rest } from "msw";
import { MOYSKLAD_BASE_URL } from "../constants";
import { stockAll, stockAllCurrent } from "./stock";

export default [
  stockAll,
  stockAllCurrent,
  rest.get(
    `${MOYSKLAD_BASE_URL}/report/profit/byvariant`,
    (_, response, context) => response(context.json({ rows: [] })),
  ),
  rest.get(
    `${MOYSKLAD_BASE_URL}/report/money/plotseries`,
    (_, response, context) => response(context.json({ rows: [] })),
  ),
  rest.get(
    `${MOYSKLAD_BASE_URL}/report/money/byaccount`,
    (_, response, context) => response(context.json({ rows: [] })),
  ),
];
