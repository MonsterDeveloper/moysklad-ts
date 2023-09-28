import type { PaginationOptions } from "@/types";

export function composeSearchParameters({
  pagination,
}: {
  pagination?: PaginationOptions;
}) {
  const searchParameters = new URLSearchParams();

  if (pagination?.limit)
    searchParameters.append("limit", pagination.limit.toString());
  if (pagination?.offset)
    searchParameters.append("offset", pagination.offset.toString());

  return searchParameters.size > 0 ? searchParameters : undefined;
}
