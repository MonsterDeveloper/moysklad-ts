import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiClient } from "@/api-client";
import { ProductEndpoint } from "./endpoint";
import { MediaType } from "@/types";

const ENDPOINT_URL = "/entity/product";
const CLIENT_OPTIONS = { auth: { token: "" } };

describe("ProductEndpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("list", () => {
    it("should send a GET request to root", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new ProductEndpoint(client);

      await endpoint.list();

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(ENDPOINT_URL),
        expect.objectContaining({ method: "GET" }),
      );
    });

    it("should send a GET request to root with search parameters", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new ProductEndpoint(client);

      await endpoint.list({
        filter: { name: "123" },
        expand: { owner: { group: true } },
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          `${ENDPOINT_URL}?limit=100&expand=owner.group&filter=name%3D123`,
        ),
        expect.objectContaining({ method: "GET" }),
      );
    });
  });

  describe("get", () => {
    it("should send a GET request to root with id", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new ProductEndpoint(client);

      await endpoint.get("123");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/123`),
        expect.objectContaining({ method: "GET" }),
      );
    });

    it("should send a GET request with search parameters", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new ProductEndpoint(client);

      await endpoint.get("123", {
        expand: { owner: { group: true } },
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          `${ENDPOINT_URL}/123?limit=100&expand=owner.group`,
        ),
        expect.objectContaining({ method: "GET" }),
      );
    });
  });

  describe("first", () => {
    it("should send a GET request to root with limit 1", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new ProductEndpoint(client);

      await endpoint.first();

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}?limit=1`),
        expect.objectContaining({ method: "GET" }),
      );
    });

    it("should send a GET request with search parameters", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new ProductEndpoint(client);

      await endpoint.first({
        expand: { owner: { group: true } },
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}?limit=1&expand=owner.group`),
        expect.objectContaining({ method: "GET" }),
      );
    });
  });

  describe("size", () => {
    it("should send a GET request to root with limit 0", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new ProductEndpoint(client);

      await endpoint.size();

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}?limit=0`),
        expect.objectContaining({ method: "GET" }),
      );
    });
  });

  describe("delete", () => {
    it("should send a DELETE request to root with id", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new ProductEndpoint(client);

      await endpoint.delete("123");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/123`),
        expect.objectContaining({ method: "DELETE" }),
      );
    });
  });

  describe("batchDelete", () => {
    const ids = ["123", "456"];

    it("should send a POST request with ids", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new ProductEndpoint(client);

      await endpoint.batchDelete(ids);

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/delete`),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(
            ids.map((id) => ({
              meta: {
                href: client.buildUrl(`${ENDPOINT_URL}/${id}`),
                mediaType: MediaType.Json,
              },
            })),
          ),
        }),
      );
    });
  });

  describe("all", () => {
    it("should fetch all demands", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({
        auth: { token: "" },
        baseUrl: "https://batch-get.com",
      });
      const endpoint = new ProductEndpoint(client);

      const { rows } = await endpoint.all();

      expect(fetchSpy).toHaveBeenCalledTimes(6);
      expect(rows).toHaveLength(5555);
    });
  });

  describe("trash", () => {
    it("should send a POST request to root with id", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new ProductEndpoint(client);

      await endpoint.trash("123");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/123/trash`),
        expect.objectContaining({ method: "POST" }),
      );
    });
  });

  describe("update", () => {
    it("should send a PUT request with id and data", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new ProductEndpoint(client);

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
      const endpoint = new ProductEndpoint(client);

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
    it("should send a POST request with data", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new ProductEndpoint(client);

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
      const endpoint = new ProductEndpoint(client);

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
});
