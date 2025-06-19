import { describe, it, expect } from "vitest";
import { moysklad, createFetchMock, expectFetch } from "../../../test-utils";
import { BonusTransactionType } from "./types";
import { Entity } from "../../types/entity";
import { MediaType } from "../../types/media-type";

describe("bonusTransaction", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.bonusTransaction.list();

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "GET",
      });
    });

    it("makes a request with pagination options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.bonusTransaction.list({
        pagination: {
          limit: 100,
          offset: 50,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "GET",
        searchParameters: {
          limit: "100",
          offset: "50",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.bonusTransaction.list({
        filter: {
          bonusValue: 100,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "GET",
        searchParameters: {
          filter: "bonusValue=100",
        },
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.bonusTransaction.list({
        expand: {
          agent: true,
          bonusProgram: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "GET",
        searchParameters: {
          expand: "agent,bonusProgram",
          limit: "100",
        },
      });
    });

    it("makes a request with order options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.bonusTransaction.list({
        order: { field: "moment", direction: "asc" },
      });

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "GET",
        searchParameters: {
          order: "moment,asc",
        },
      });
    });

    it("makes a request with search option", async () => {
      const fetchMock = createFetchMock();

      await moysklad.bonusTransaction.list({
        search: "test",
      });

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "GET",
        searchParameters: {
          search: "test",
        },
      });
    });
  });

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.bonusTransaction.all();

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "GET",
        searchParameters: {
          limit: "1000",
          offset: "0",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.bonusTransaction.all({
        filter: {
          bonusValue: 100,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "GET",
        searchParameters: {
          limit: "1000",
          offset: "0",
          filter: "bonusValue=100",
        },
      });
    });
  });

  describe("first", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.bonusTransaction.first();

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.bonusTransaction.first({
        filter: {
          bonusValue: 100,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "GET",
        searchParameters: {
          limit: "1",
          filter: "bonusValue=100",
        },
      });
    });
  });

  describe("get", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const id = "a7404397-83a7-11ed-0a80-0e9700500d7e";

      await moysklad.bonusTransaction.get(id);

      expectFetch({
        fetchMock,
        url: `/entity/bonustransaction/${id}`,
        method: "GET",
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const id = "a7404397-83a7-11ed-0a80-0e9700500d7e";

      await moysklad.bonusTransaction.get(id, {
        expand: {
          agent: true,
          bonusProgram: true,
        },
      });

      expectFetch({
        fetchMock,
        url: `/entity/bonustransaction/${id}`,
        method: "GET",
        searchParameters: {
          expand: "agent,bonusProgram",
          limit: "100",
        },
      });
    });
  });

  describe("create", () => {
    it("makes a request with required fields", async () => {
      const fetchMock = createFetchMock();
      const data = {
        agent: {
          meta: {
            href: "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/a7404397-83a7-11ed-0a80-0e9700500d7e",
            type: Entity.Counterparty,
            mediaType: MediaType.Json,
          },
        },
        transactionType: BonusTransactionType.Earning,
      } as const;

      await moysklad.bonusTransaction.create(data);

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "POST",
        body: data,
      });
    });

    it("makes a request with all fields", async () => {
      const fetchMock = createFetchMock();
      const data = {
        agent: {
          meta: {
            href: "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/a7404397-83a7-11ed-0a80-0e9700500d7e",
            type: Entity.Counterparty,
            mediaType: MediaType.Json,
          },
        },
        transactionType: BonusTransactionType.Earning,
        bonusValue: 100,
        bonusProgram: {
          meta: {
            href: "https://api.moysklad.ru/api/remap/1.2/entity/bonusprogram/b8515408-94b8-12fe-1b91-1f8811600e8f",
            type: Entity.BonusProgram,
            mediaType: MediaType.Json,
          },
        },
        applicable: true,
        name: "Test Bonus Transaction",
        code: "TEST-001",
        moment: "2023-01-01 12:00:00",
        executionDate: "2023-01-02 12:00:00",
      } as const;

      await moysklad.bonusTransaction.create(data);

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "POST",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const data = {
        agent: {
          meta: {
            href: "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/a7404397-83a7-11ed-0a80-0e9700500d7e",
            type: Entity.Counterparty,
            mediaType: MediaType.Json,
          },
        },
        transactionType: BonusTransactionType.Earning,
        bonusValue: 100,
      } as const;

      await moysklad.bonusTransaction.create(data, {
        expand: {
          agent: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "agent",
          limit: "100",
        },
      });
    });
  });

  describe("update", () => {
    it("makes a request with updated fields", async () => {
      const fetchMock = createFetchMock();
      const id = "a7404397-83a7-11ed-0a80-0e9700500d7e";
      const data = {
        bonusValue: 200,
        name: "Updated Bonus Transaction",
      };

      await moysklad.bonusTransaction.update(id, data);

      expectFetch({
        fetchMock,
        url: `/entity/bonustransaction/${id}`,
        method: "PUT",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const id = "a7404397-83a7-11ed-0a80-0e9700500d7e";
      const data = {
        bonusValue: 200,
      };

      await moysklad.bonusTransaction.update(id, data, {
        expand: {
          agent: true,
        },
      });

      expectFetch({
        fetchMock,
        url: `/entity/bonustransaction/${id}`,
        method: "PUT",
        body: data,
        searchParameters: {
          expand: "agent",
          limit: "100",
        },
      });
    });
  });

  describe("upsert", () => {
    it("makes a create request when no id is provided", async () => {
      const fetchMock = createFetchMock();
      const data = {
        agent: {
          meta: {
            href: "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/a7404397-83a7-11ed-0a80-0e9700500d7e",
            type: Entity.Counterparty,
            mediaType: MediaType.Json,
          },
        },
        transactionType: BonusTransactionType.Earning,
        bonusValue: 100,
      } as const;

      await moysklad.bonusTransaction.upsert(data);

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "POST",
        body: data,
      });
    });

    it("makes an update request when id is provided", async () => {
      const fetchMock = createFetchMock();
      const data = {
        meta: {
          href: "https://api.moysklad.ru/api/remap/1.2/entity/bonustransaction/a7404397-83a7-11ed-0a80-0e9700500d7e",
          type: Entity.BonusTransaction,
          mediaType: MediaType.Json,
        },
        agent: {
          meta: {
            href: "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/a7404397-83a7-11ed-0a80-0e9700500d7e",
            type: Entity.Counterparty,
            mediaType: MediaType.Json,
          },
        },
        transactionType: BonusTransactionType.Earning,
        bonusValue: 200,
      } as const;

      await moysklad.bonusTransaction.upsert(data);

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "POST",
        body: data,
      });
    });

    it("makes a request with expand options", async () => {
      const fetchMock = createFetchMock();
      const data = {
        meta: {
          href: "https://api.moysklad.ru/api/remap/1.2/entity/bonustransaction/a7404397-83a7-11ed-0a80-0e9700500d7e",
          type: Entity.BonusTransaction,
          mediaType: MediaType.Json,
        },
        agent: {
          meta: {
            href: "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/a7404397-83a7-11ed-0a80-0e9700500d7e",
            type: Entity.Counterparty,
            mediaType: MediaType.Json,
          },
        },
        transactionType: BonusTransactionType.Earning,
        bonusValue: 200,
      } as const;

      await moysklad.bonusTransaction.upsert(data, {
        expand: {
          agent: true,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "POST",
        body: data,
        searchParameters: {
          expand: "agent",
          limit: "100",
        },
      });
    });

    it("handles array of items for batch operations", async () => {
      const fetchMock = createFetchMock();
      const data = [
        {
          agent: {
            meta: {
              href: "https://api.moysklad.ru/api/remap/1.2/entity/counterparty/a7404397-83a7-11ed-0a80-0e9700500d7e",
              type: Entity.Counterparty,
              mediaType: MediaType.Json,
            },
          },
          transactionType: BonusTransactionType.Earning,
          bonusValue: 100,
        },
        {
          meta: {
            href: "https://api.moysklad.ru/api/remap/1.2/entity/bonustransaction/b8515408-94b8-12fe-1b91-1f8811600e8f",
            type: Entity.BonusTransaction,
            mediaType: MediaType.Json,
          },
          bonusValue: 200,
        },
      ] as const;

      await moysklad.bonusTransaction.upsert(data as never);

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "POST",
        body: data,
      });
    });
  });

  describe("delete", () => {
    it("makes a delete request", async () => {
      const fetchMock = createFetchMock();
      const id = "a7404397-83a7-11ed-0a80-0e9700500d7e";

      await moysklad.bonusTransaction.delete(id);

      expectFetch({
        fetchMock,
        url: `/entity/bonustransaction/${id}`,
        method: "DELETE",
      });
    });
  });

  describe("batchDelete", () => {
    it("makes a batch delete request", async () => {
      const fetchMock = createFetchMock();
      const ids = [
        "a7404397-83a7-11ed-0a80-0e9700500d7e",
        "b8515408-94b8-12fe-1b91-1f8811600e8f",
      ];

      await moysklad.bonusTransaction.batchDelete(ids);

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction/delete",
        method: "POST",
        body: ids.map((id) => ({
          meta: {
            href: `https://test-api.moysklad.ru/api/remap/1.2/entity/bonustransaction/${id}`,
            type: Entity.BonusTransaction,
            mediaType: MediaType.Json,
          },
        })),
      });
    });
  });

  describe("size", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();

      await moysklad.bonusTransaction.size();

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.bonusTransaction.size({
        filter: {
          moment: {
            lte: "2025-01-01",
          },
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/bonustransaction",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "moment<=2025-01-01",
          limit: "0",
        }),
      });
    });
  });
});
