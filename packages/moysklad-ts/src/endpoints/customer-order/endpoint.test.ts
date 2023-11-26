import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiClient } from "@/api-client";
import { CustomerOrderEndpoint } from "./endpoint";

const ENDPOINT_URL = "/entity/customerorder";
const CLIENT_OPTIONS = { auth: { token: "" } };

describe("DemandEndpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("get", () => {
    it("should send a GET request to root with id", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new CustomerOrderEndpoint(client);

      await endpoint.get("123");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/123`),
        expect.objectContaining({ method: "GET" }),
      );
    });

    it("should send a GET request with search parameters", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new CustomerOrderEndpoint(client);

      await endpoint.get("123", {
        expand: { organization: { owner: true } },
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          `${ENDPOINT_URL}/123?limit=100&expand=organization.owner`,
        ),
        expect.objectContaining({ method: "GET" }),
      );
    });
  });

  describe("trash", () => {
    it("should send a POST request to root with id", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new CustomerOrderEndpoint(client);

      await endpoint.trash("123");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/123/trash`),
        expect.objectContaining({ method: "POST" }),
      );
    });
  });
});
