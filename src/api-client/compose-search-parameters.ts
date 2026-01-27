import type { Filter, OrderOption, PaginationOptions } from "../types"

function traverseExpand(expand: Record<string, unknown>, depth = 0) {
  if (depth > 2) {
    throw new Error("Expand depth cannot be more than 3")
  }

  const fields: string[] = []

  for (const [key, value] of Object.entries(expand)) {
    if (!value) {
      continue
    }

    if (typeof value === "object" && Object.keys(value).length > 0) {
      const subFields = traverseExpand(
        value as Record<string, unknown>,
        depth + 1,
      )
      for (const subField of subFields) {
        fields.push(`${key}.${subField}`)
      }
      continue
    }

    fields.push(key)
  }

  return fields
}

function traverseOrder(order: OrderOption<string> | OrderOption<string>[]) {
  const fields: string[] = []

  if (typeof order === "string") {
    fields.push(order)
  } else if (Array.isArray(order)) {
    for (const orderOption of order) {
      if (typeof orderOption === "string") {
        fields.push(orderOption)
      } else {
        fields.push(`${orderOption.field},${orderOption.direction}`)
      }
    }
  } else {
    fields.push(`${order.field},${order.direction}`)
  }

  return fields
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: looks okay for now
function traverseFilter(field: string, filter: Filter | undefined) {
  const filters = [] as string[]

  if (filter === undefined) {
    return filters
  }

  if (
    typeof filter === "string" ||
    typeof filter === "number" ||
    typeof filter === "boolean"
  ) {
    filters.push(`${field}=${filter}`)
    return filters
  }

  if (Array.isArray(filter)) {
    filters.push(...filter.map((v) => `${field}=${v}`))
    return filters
  }

  for (const [operator, condition] of Object.entries(filter)) {
    if (operator === "eq" || operator === "ne") {
      if (Array.isArray(condition)) {
        filters.push(
          ...condition.map(
            (v) => `${field}${operator === "eq" ? "=" : "!="}${v}`,
          ),
        )
        continue
      }

      filters.push(`${field}${operator === "eq" ? "=" : "!="}${condition}`)
      continue
    }

    if (operator === "isNull") {
      filters.push(`${field}${condition ? "" : "!"}=`)
      continue
    }

    if (operator === "isNotNull") {
      filters.push(`${field}${condition ? "!" : ""}=`)
      continue
    }

    if (operator === "gt") {
      filters.push(`${field}>${condition}`)
      continue
    }

    if (operator === "gte") {
      filters.push(`${field}>=${condition}`)
      continue
    }

    if (operator === "lt") {
      filters.push(`${field}<${condition}`)
      continue
    }

    if (operator === "lte") {
      filters.push(`${field}<=${condition}`)
      continue
    }

    if (operator === "like") {
      filters.push(`${field}~${condition}`)
      continue
    }

    if (operator === "sw") {
      filters.push(`${field}~=${condition}`)
      continue
    }

    if (operator === "ew") {
      filters.push(`${field}=~${condition}`)
    }
  }

  return filters
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: look okay for now
export function composeSearchParameters({
  pagination,
  expand,
  order,
  search,
  filter,
  namedfilter,
  ...options
}: {
  pagination?: PaginationOptions
  expand?: Record<string, unknown>
  order?: OrderOption<string> | OrderOption<string>[]
  search?: string
  filter?: Record<string, Filter | undefined>
  namedfilter?: string
}) {
  const searchParameters = new URLSearchParams()
  const expandFields = expand && traverseExpand(expand)

  if (namedfilter) {
    searchParameters.append("namedfilter", namedfilter)
  }

  if (typeof pagination?.limit === "number") {
    searchParameters.append("limit", pagination.limit.toString())
  } else if (expandFields && expandFields.length > 0) {
    searchParameters.append("limit", "100")
  }

  if (typeof pagination?.offset === "number") {
    searchParameters.append("offset", pagination.offset.toString())
  }

  if (expandFields && expandFields.length > 0) {
    searchParameters.append("expand", expandFields.join(","))
  }

  if (order) {
    const orderFields = traverseOrder(order)
    if (orderFields.length > 0) {
      searchParameters.append("order", orderFields.join(";"))
    }
  }

  if (search) {
    searchParameters.append("search", search)
  }

  if (filter) {
    const filters = [] as string[]

    for (const [field, value] of Object.entries(filter)) {
      filters.push(...traverseFilter(field, value))
    }

    if (filters.length > 0) {
      searchParameters.append("filter", filters.join(";"))
    }
  }

  for (const [field, value] of Object.entries(options)) {
    searchParameters.append(field, String(value))
  }

  return searchParameters.size > 0 ? searchParameters : undefined
}
