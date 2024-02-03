import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiClient } from "@/api-client";
import { CustomEntityEndpoint } from "./endpoint";

const ENDPOINT_URL = "/entity/customentity";
const CLIENT_OPTIONS = { auth: { token: "" } };

describe("CustomEntityEndpoint", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("get", () => {
    it("should send a GET request to root with id", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient(CLIENT_OPTIONS);
      const endpoint = new CustomEntityEndpoint(client);

      await endpoint.get("123");

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining(`${ENDPOINT_URL}/123`),
        expect.objectContaining({ method: "GET" }),
      );
    });
  });
});
