import { describe, expect, it } from "vitest"
import { extractIdFromMetaHref } from "./extract-id-from-meta-href"

describe("extractIdFromMetaHref", () => {
  it("extracts id from meta href", () => {
    const href =
      "https://api.moysklad.ru/api/remap/1.2/entity/product/7944ef04-f831-11e5-7a69-971500188b19"

    const id = extractIdFromMetaHref(href)

    expect(id).toBe("7944ef04-f831-11e5-7a69-971500188b19")
  })

  it("extracts id from meta href with query parameters", () => {
    const href =
      "https://api.moysklad.ru/api/remap/1.2/entity/product/7944ef04-f831-11e5-7a69-971500188b19?expand=owner"

    const id = extractIdFromMetaHref(href)

    expect(id).toBe("7944ef04-f831-11e5-7a69-971500188b19")
  })

  it("extracts id from meta href with multiple query parameters", () => {
    const href =
      "https://api.moysklad.ru/api/remap/1.2/entity/product/7944ef04-f831-11e5-7a69-971500188b19?expand=owner&limit=100"

    const id = extractIdFromMetaHref(href)

    expect(id).toBe("7944ef04-f831-11e5-7a69-971500188b19")
  })

  it("returns undefined for undefined input", () => {
    const id = extractIdFromMetaHref(undefined)

    expect(id).toBeUndefined()
  })

  it("handles different entity types", () => {
    const hrefs = [
      "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/abc123",
      "https://api.moysklad.ru/api/remap/1.2/entity/organization/def456",
      "https://api.moysklad.ru/api/remap/1.2/entity/employee/ghi789",
    ]

    expect(extractIdFromMetaHref(hrefs[0])).toBe("abc123")
    expect(extractIdFromMetaHref(hrefs[1])).toBe("def456")
    expect(extractIdFromMetaHref(hrefs[2])).toBe("ghi789")
  })
})
