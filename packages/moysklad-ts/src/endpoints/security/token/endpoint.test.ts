import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiClient } from "@/api-client";
import { TokenEndpoint } from "./endpoint";

describe("TokenEndpoint", () => {
  describe("create", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should send a POST request to /security/token", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const client = new ApiClient({ auth: { token: "" } });
      const endpoint = new TokenEndpoint(client);

      const { access_token } = await endpoint.create();

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining("/security/token"),
        expect.objectContaining({ method: "POST" }),
      );
      expect(access_token).toEqual(expect.any(String));
    });
  });
});
