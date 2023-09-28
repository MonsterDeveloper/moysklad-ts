import type { PaginationOptions } from "@/types";

function traverseExpand(expand: Record<string, unknown>, depth = 0) {
  if (depth > 2) {
    throw new Error("Expand depth cannot be more than 3");
  }

  const fields: string[] = [];

  for (const [key, value] of Object.entries(expand)) {
    if (!value) continue;

    if (
      typeof value === "object" &&
      value !== null &&
      Object.keys(value).length > 0
    ) {
      const subFields = traverseExpand(
        value as Record<string, unknown>,
        depth + 1,
      );
      for (const subField of subFields) fields.push(`${key}.${subField}`);
      continue;
    }

    fields.push(key);
  }

  return fields;
}

export function composeSearchParameters({
  pagination,
  expand,
}: {
  pagination?: PaginationOptions;
  expand?: Record<string, unknown>;
}) {
  const searchParameters = new URLSearchParams();

  if (pagination?.limit)
    searchParameters.append("limit", pagination.limit.toString());
  if (pagination?.offset)
    searchParameters.append("offset", pagination.offset.toString());

  if (expand) {
    const expandFields = traverseExpand(expand);
    if (expandFields.length > 0)
      searchParameters.append("expand", expandFields.join(","));
  }

  return searchParameters.size > 0 ? searchParameters : undefined;
}
