/* eslint-disable sonarjs/no-duplicate-string */
import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiClient } from "../../api-client";
import { BonusTransactionEndpoint } from "./endpoint";
import { Entity, MediaType } from "../../types";

const ENDPOINT_URL = "/entity/bonustransaction";

describe("BonusTransactionEndpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("list", () => {
    it("should send a GET request to bonus transaction endpoint", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new BonusTransactionEndpoint(client);

      await endpoint.list();

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(ENDPOINT_URL),
        expect.objectContaining({ method: "GET" }),
      );
    });

    it("should send a GET request with search parameters", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new BonusTransactionEndpoint(client);

      await endpoint.list({
        filter: { name: "123" },
        expand: { organization: { owner: true } },
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          `${ENDPOINT_URL}?limit=100&expand=organization.owner&filter=name%3D123`,
        ),
        expect.objectContaining({ method: "GET" }),
      );
    });
  });

  describe("get", () => {
    it("should send a GET request to bonus transaction endpoint with id", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new BonusTransactionEndpoint(client);

      await endpoint.get("123");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/123`),
        expect.objectContaining({ method: "GET" }),
      );
    });

    it("should send a GET request with search parameters", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new BonusTransactionEndpoint(client);

      await endpoint.get("123", { expand: { group: true } });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/123?limit=100&expand=group`),
        expect.objectContaining({ method: "GET" }),
      );
    });
  });

  describe("update", () => {
    it("should send a PUT request to bonus transaction endpoint with id and data", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new BonusTransactionEndpoint(client);

      const data = { name: "123" };

      await endpoint.update("123", data);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/123`),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify(data),
        }),
      );
    });

    it("should send a PUT request with search parameters", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new BonusTransactionEndpoint(client);

      const data = { name: "123" };

      await endpoint.update("123", data, { expand: { owner: true } });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/123?limit=100&expand=owner`),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify(data),
        }),
      );
    });
  });

  describe("create", () => {
    it("should send a POST request to bonus transaction endpoint with data", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new BonusTransactionEndpoint(client);

      await endpoint.create({} as never);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(ENDPOINT_URL),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({}),
        }),
      );
    });

    it("should send a POST request with search parameters", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new BonusTransactionEndpoint(client);

      await endpoint.create({} as never, { expand: { owner: true } });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}?limit=100&expand=owner`),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({}),
        }),
      );
    });
  });

  describe("upsert", () => {
    const data = [{ foo: "bar" }];

    it("should send a POST request to bonus transaction endpoint with data", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new BonusTransactionEndpoint(client);

      await endpoint.upsert(data as never);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(ENDPOINT_URL),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(data),
        }),
      );
    });

    it("should send a POST request with search parameters", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new BonusTransactionEndpoint(client);

      await endpoint.upsert(data as never, { expand: { organization: true } });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          `${ENDPOINT_URL}?limit=100&expand=organization`,
        ),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(data),
        }),
      );
    });
  });

  describe("first", () => {
    it("should send a GET request to bonus transaction endpoint with limit 1", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new BonusTransactionEndpoint(client);

      await endpoint.first();

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}?limit=1`),
        expect.objectContaining({ method: "GET" }),
      );
    });

    it("should send a GET request with search parameters", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new BonusTransactionEndpoint(client);

      await endpoint.first({ expand: { owner: true } });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}?limit=1&expand=owner`),
        expect.objectContaining({ method: "GET" }),
      );
    });
  });

  describe("size", () => {
    it("should send a GET request to bonus transaction endpoint with limit 0", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new BonusTransactionEndpoint(client);

      await endpoint.size();

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}?limit=0`),
        expect.objectContaining({ method: "GET" }),
      );
    });
  });

  describe("delete", () => {
    it("should send a DELETE request to bonus transaction endpoint with id", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new BonusTransactionEndpoint(client);

      await endpoint.delete("123");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/123`),
        expect.objectContaining({ method: "DELETE" }),
      );
    });
  });

  describe("batchDelete", () => {
    const ids = ["123", "456"];

    it("should send a POST request to bonus transaction endpoint with ids", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new BonusTransactionEndpoint(client);

      await endpoint.batchDelete(ids);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/delete`),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(
            ids.map((id) => ({
              meta: {
                href: client.buildUrl(`${ENDPOINT_URL}/${id}`),
                type: Entity.BonusTransaction,
                mediaType: MediaType.Json,
              },
            })),
          ),
        }),
      );
    });
  });

  describe("all", () => {
    it("should fetch all bonus transactions", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({
        auth: { token: "" },
        baseUrl: "https://batch-get.com",
      });
      const endpoint = new BonusTransactionEndpoint(client);

      const { rows } = await endpoint.all();

      expect(fetchSpy).toHaveBeenCalledTimes(6);
      expect(rows).toHaveLength(5555);
    });
  });
});
