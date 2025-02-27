import { describe, expect, it, vi } from "vitest";
import { createMoysklad } from "../../proxy";
import { Entity, MediaType, type Meta } from "../../types";

const moysklad = createMoysklad({
  auth: {
    token: "123",
  },
});

const mockStore: Meta<Entity.Store> = {
  meta: {
    type: Entity.Store,
    href: "",
    mediaType: MediaType.Json,
    metadataHref: "",
  },
};

function getFetchSpy() {
  return vi
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve(new Response(JSON.stringify({}))),
    );
}

describe("wizard", () => {
  describe("salesreturn", () => {
    it("constructs correct URL with evaluate_cost action", async () => {
      const fetchSpy = getFetchSpy();

      await moysklad.wizard.salesreturn({
        action: "evaluate_cost",
        store: mockStore,
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        "https://api.moysklad.ru/api/remap/1.2/wizard/salesreturn?action=evaluate_cost",
        expect.any(Object),
      );
    });

    it("sends correct request body", async () => {
      const fetchSpy = getFetchSpy();

      const requestData = {
        store: mockStore,
        positions: [
          {
            assortment: {
              meta: {
                type: Entity.Product,
                href: "",
                mediaType: MediaType.Json,
                metadataHref: "",
              },
            } as const,
            quantity: 5,
          },
        ],
      };

      await moysklad.wizard.salesreturn({
        action: "evaluate_cost",
        ...requestData,
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(requestData),
        }),
      );
    });
  });
});
