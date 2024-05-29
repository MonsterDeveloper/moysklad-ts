import { rest } from "msw";
import { BATCH_GET_BASE_URL } from "./constants";

const BATCH_GET_DATA = [...Array.from({ length: 5555 }).keys()];

export default rest.get(
  `${BATCH_GET_BASE_URL}*`,
  (request, response, context) => {
    const offset = Number(request.url.searchParams.get("offset"));
    const limit = Number(request.url.searchParams.get("limit"));

    return response(
      context.status(200),
      context.json({
        rows: BATCH_GET_DATA.slice(offset, offset + limit),
        meta: { size: BATCH_GET_DATA.length },
        context: {},
      }),
    );
  },
);
