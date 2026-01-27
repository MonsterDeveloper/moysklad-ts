import { describe, expect, it } from "vitest"
import { ApiClient } from "./api-client"
import { createMoysklad } from "./proxy"

describe("createMoysklad", () => {
  describe("client property", () => {
    it("exposes the ApiClient instance via the client property at top level", () => {
      const moysklad = createMoysklad({
        auth: {
          token: "test-token",
        },
      })

      expect(moysklad.client).toBeInstanceOf(ApiClient)
    })

    it("allows access to client methods through the client property", () => {
      const moysklad = createMoysklad({
        auth: {
          token: "test-token",
        },
        baseUrl: "https://test-api.moysklad.ru/api/remap/1.2",
      })

      expect(typeof moysklad.client.get).toBe("function")
      expect(typeof moysklad.client.post).toBe("function")
      expect(typeof moysklad.client.put).toBe("function")
      expect(typeof moysklad.client.delete).toBe("function")
      expect(typeof moysklad.client.request).toBe("function")
      expect(typeof moysklad.client.buildUrl).toBe("function")

      expect(moysklad.client.buildUrl("/test")).toBeInstanceOf(URL)
    })

    it("throws an error when accessing client property on nested paths", () => {
      const moysklad = createMoysklad({
        auth: {
          token: "test-token",
        },
      })

      const invalidClient = (moysklad.product as unknown as { client: unknown })
        .client

      expect(invalidClient).not.toBeInstanceOf(ApiClient)
    })
  })
})
