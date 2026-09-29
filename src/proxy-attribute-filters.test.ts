import { afterEach, describe, expect, it, vi } from "vitest"
import { composeSearchParameters } from "./api-client"
import { createMoysklad } from "./proxy"

const baseUrl = "https://example.com/custom/1.2"
const client = createMoysklad({ auth: { token: "test" }, baseUrl })

function listResponse(): Response {
  return new Response(JSON.stringify({ meta: { size: 0 }, rows: [] }))
}

function getFilter(request: Request): string | null {
  return new URL(request.url).searchParams.get("filter")
}

describe("attribute filters", () => {
  afterEach((): void => {
    vi.restoreAllMocks()
  })

  it("serializes operators with a custom base URL", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(listResponse()))

    await client.processingPlan.list({
      filter: {
        attributes: {
          "attribute-id": { gte: 5, lt: 10 },
        },
      },
    })

    const request = fetchMock.mock.calls[0]?.[0] as Request
    expect(getFilter(request)).toBe(
      `${baseUrl}/entity/processingplan/metadata/attributes/attribute-id>=5;${baseUrl}/entity/processingplan/metadata/attributes/attribute-id<10`,
    )
  })

  it("uses product-owned attributes for services and assortment", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(listResponse()))

    await client.service.list({ filter: { attributes: { service: "yes" } } })
    await client.assortment.list({
      filter: { attributes: { assortment: { ne: "no" } } },
    })

    const filters = fetchMock.mock.calls.map(([request]) =>
      getFilter(request as Request),
    )
    expect(filters).toEqual([
      `${baseUrl}/entity/product/metadata/attributes/service=yes`,
      `${baseUrl}/entity/product/metadata/attributes/assortment!=no`,
    ])
  })

  it("uses product-owned attributes for bundles in centralized serialization", () => {
    const parameters = composeSearchParameters(
      { filter: { attributes: { bundle: "yes" } } },
      {
        endpoint: "/entity/bundle",
        buildUrl: (parts): URL =>
          new URL(
            `${baseUrl}/${typeof parts === "string" ? parts : parts.join("/")}`,
          ),
      },
    )

    expect(parameters?.get("filter")).toBe(
      `${baseUrl}/entity/product/metadata/attributes/bundle=yes`,
    )
  })

  it("preserves mixed legacy and ID filters targeting the same attribute", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(listResponse())
    const attributeUrl = `${baseUrl}/entity/product/metadata/attributes/same-id`
    const filter = {
      [attributeUrl]: "legacy",
      attributes: { "same-id": "new" },
    } as const
    const before = structuredClone(filter)

    await client.product.list({ filter })

    const request = fetchMock.mock.calls[0]?.[0] as Request
    expect(getFilter(request)).toBe(
      `${attributeUrl}=legacy;${attributeUrl}=new`,
    )
    expect(filter).toEqual(before)
  })

  it("handles ID filters identically in list, all, first, and size", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(listResponse()))
    const options = { filter: { attributes: { shared: { eq: ["a", "b"] } } } }
    const before = structuredClone(options)

    await client.product.list(options)
    await client.product.all(options)
    await client.product.first(options)
    await client.product.size(options)

    const filters = fetchMock.mock.calls.map(([request]) =>
      getFilter(request as Request),
    )
    const attributeUrl = `${baseUrl}/entity/product/metadata/attributes/shared`
    expect(filters).toEqual(
      Array.from(
        { length: 4 },
        (): string => `${attributeUrl}=a;${attributeUrl}=b`,
      ),
    )
    expect(options).toEqual(before)
  })
})
