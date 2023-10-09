import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiClient } from "@/api-client";
import { CounterpartyEndpoint } from "./endpoint";

const ENDPOINT_URL = "/entity/counterparty";
const CLIENT_OPTIONS = { auth: { token: "" } };

describe("CounterpartyEndpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("list", () => {
    it("should send a GET request to root", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new CounterpartyEndpoint(client);

      await endpoint.list();

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(ENDPOINT_URL),
        expect.objectContaining({ method: "GET" }),
      );
    });

    it("should send a GET request to root with search parameters", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new CounterpartyEndpoint(client);

      await endpoint.list({
        filter: { name: "123" },
        expand: { owner: { group: true } },
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          `${ENDPOINT_URL}?expand=owner.group&filter=name%3D123`,
        ),
        expect.objectContaining({ method: "GET" }),
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
      const endpoint = new CounterpartyEndpoint(client);

      const { rows } = await endpoint.all();

      expect(fetchSpy).toHaveBeenCalledTimes(6);
      expect(rows).toHaveLength(5555);
    });
  });

  describe("get", () => {
    it("should send a GET request to root with id", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new CounterpartyEndpoint(client);

      await endpoint.get("123");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/123`),
        expect.objectContaining({ method: "GET" }),
      );
    });

    it("should send a GET request with search parameters", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new CounterpartyEndpoint(client);

      await endpoint.get("123", {
        expand: { group: true },
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/123?expand=group`),
        expect.objectContaining({ method: "GET" }),
      );
    });
  });

  describe("update", () => {
    it("should send a PUT request to root with id and data", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new CounterpartyEndpoint(client);

      await endpoint.update("123", { name: "New Name" });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/123`),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({ name: "New Name" }),
        }),
      );
    });

    it("should send a PUT request with search parameters", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new CounterpartyEndpoint(client);

      await endpoint.update(
        "123",
        { name: "New Name" },
        {
          expand: { owner: { group: true } },
        },
      );

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/123?expand=owner.group`),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({ name: "New Name" }),
        }),
      );
    });
  });
});
