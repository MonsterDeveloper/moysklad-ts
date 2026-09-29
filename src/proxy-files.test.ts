import { afterEach, describe, expect, it, vi } from "vitest"
import { createMoysklad } from "./proxy"
import type { AttachedFile, FileUpload } from "./types"

const client = createMoysklad({
  auth: { token: "test" },
  baseUrl: "https://example.com/api",
})

function jsonResponse(body: object): Response {
  return new Response(JSON.stringify(body))
}

function createUploads(count: number): FileUpload[] {
  return Array.from(
    { length: count },
    (_, index): FileUpload => ({
      filename: `${index}.txt`,
      content: `content-${index}`,
    }),
  )
}

function getRequestBody(request: Request): Promise<unknown> {
  return request.clone().json()
}

describe("file methods", () => {
  afterEach((): void => {
    vi.restoreAllMocks()
  })

  it("lists a paginated file response", async () => {
    const response = { meta: { size: 0 }, context: {}, rows: [] }
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(jsonResponse(response))

    await expect(
      client.invoiceIn.listFiles("invoice-id", {
        pagination: { limit: 10, offset: 20 },
      }),
    ).resolves.toEqual(response)

    const request = fetchMock.mock.calls[0]?.[0] as Request
    expect(request.method).toBe("GET")
    expect(request.url).toBe(
      "https://example.com/api/entity/invoicein/invoice-id/files?limit=10&offset=20",
    )
  })

  it("sends exact upload payloads and encodes offset byte views", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(jsonResponse([]))
    const source = Uint8Array.from([99, 1, 2, 3, 99])

    await client.supply.addFiles("supply-id", [
      { filename: "text.txt", content: "dGV4dA==" },
      { filename: "bytes.bin", content: source.subarray(1, 4) },
    ])

    const request = fetchMock.mock.calls[0]?.[0] as Request
    expect(request.method).toBe("POST")
    await expect(getRequestBody(request)).resolves.toEqual([
      { filename: "text.txt", content: "dGV4dA==" },
      { filename: "bytes.bin", content: "AQID" },
    ])
  })

  it("encodes large byte buffers without argument-size failures", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(jsonResponse([]))
    const bytes = new Uint8Array(200_000)
    bytes.fill(97)

    await client.product.addFiles("product-id", [
      { filename: "large.bin", content: bytes },
    ])

    const request = fetchMock.mock.calls[0]?.[0] as Request
    const body = (await getRequestBody(request)) as Array<{ content: string }>
    expect(atob(body[0]?.content ?? "")).toHaveLength(bytes.length)
  })

  it("lists current files for an empty upload", async () => {
    const attached = [{ filename: "existing.txt" }] as AttachedFile[]
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(jsonResponse({ rows: attached }))

    await expect(client.paymentIn.addFiles("payment-id", [])).resolves.toEqual(
      attached,
    )

    const request = fetchMock.mock.calls[0]?.[0] as Request
    expect(request.method).toBe("GET")
    expect(request.url).toBe(
      "https://example.com/api/entity/paymentin/payment-id/files",
    )
  })

  it.each([
    [10, 1],
    [11, 2],
    [100, 10],
  ])("uploads %i files in %i sequential chunks", async (count, calls) => {
    let responseIndex = 0
    const fetchMock = vi.spyOn(global, "fetch").mockImplementation(() => {
      responseIndex += 1
      return Promise.resolve(
        jsonResponse([{ filename: `response-${responseIndex}.txt` }]),
      )
    })

    const result = await client.demand.addFiles(
      "demand-id",
      createUploads(count),
    )

    expect(fetchMock).toHaveBeenCalledTimes(calls)
    expect(result).toEqual([{ filename: `response-${calls}.txt` }])
    for (const [request] of fetchMock.mock.calls) {
      const body = (await getRequestBody(request as Request)) as unknown[]
      expect(body.length).toBeLessThanOrEqual(10)
    }
  })

  it("rejects 101 files before sending a request", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(jsonResponse([]))

    await expect(
      client.inventory.addFiles("inventory-id", createUploads(101)),
    ).rejects.toThrow("Cannot add more than 100 files at once")
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it("stops at the first failed chunk and preserves the original error", async () => {
    const error = new Error("network stopped")
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValueOnce(jsonResponse([]))
      .mockRejectedValueOnce(error)

    await expect(
      client.productionTask.addFiles("task-id", createUploads(21)),
    ).rejects.toBe(error)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it("deletes a file and ignores the empty response", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(null, { status: 204 }))

    await expect(
      client.service.deleteFile("service-id", "file-id"),
    ).resolves.toBeUndefined()

    const request = fetchMock.mock.calls[0]?.[0] as Request
    expect(request.method).toBe("DELETE")
    expect(request.url).toBe(
      "https://example.com/api/entity/service/service-id/files/file-id",
    )
  })
})
