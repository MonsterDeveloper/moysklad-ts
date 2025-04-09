import { describe, it } from "vitest";
import { moysklad, createFetchMock, expectFetch } from "../../../../test-utils";
import { Entity } from "../../../types";
import { TaxSystem } from "../../../types/tax-system";

describe("product folder", () => {
  describe("list", () => {
    it("retrieves list of product folders", async () => {
      const fetchMock = createFetchMock();

      await moysklad.productFolder.list();

      expectFetch({
        fetchMock,
        url: "/entity/productfolder",
        method: "GET",
      });
    });

    it("retrieves list of product folders with options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.productFolder.list({
        pagination: {
          limit: 50,
          offset: 10,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/productfolder",
        method: "GET",
        searchParameters: {
          limit: "50",
          offset: "10",
        },
      });
    });
  });

  describe("create", () => {
    it("creates minimal product folder", async () => {
      const fetchMock = createFetchMock();

      await moysklad.productFolder.create({
        name: "Овощи",
      });

      expectFetch({
        fetchMock,
        url: "/entity/productfolder",
        method: "POST",
        body: {
          name: "Овощи",
        },
      });
    });

    it("creates product folder with all fields", async () => {
      const fetchMock = createFetchMock();

      await moysklad.productFolder.create({
        name: "Фрукты",
        code: "13321Fruits",
        externalCode: "extFruits",
        vat: 3,
        vatEnabled: true,
        useParentVat: false,
        taxSystem: TaxSystem.General,
      });

      expectFetch({
        fetchMock,
        url: "/entity/productfolder",
        method: "POST",
        body: {
          name: "Фрукты",
          code: "13321Fruits",
          externalCode: "extFruits",
          vat: 3,
          vatEnabled: true,
          useParentVat: false,
          taxSystem: "GENERAL_TAX_SYSTEM",
        },
      });
    });
  });

  describe("get", () => {
    it("retrieves product folder by id", async () => {
      const fetchMock = createFetchMock();
      const id = "7944ef04-f831-11e5-7a69-971500188b19";

      await moysklad.productFolder.get(id);

      expectFetch({
        fetchMock,
        url: `/entity/productfolder/${id}`,
        method: "GET",
      });
    });
  });

  describe("update", () => {
    it("updates product folder", async () => {
      const fetchMock = createFetchMock();
      const id = "7944ef04-f831-11e5-7a69-971500188b19";

      await moysklad.productFolder.update(id, {
        name: "Группа Овощи",
        code: "vegetableFolderCode",
        externalCode: "extVegCode",
        vat: 5,
      });

      expectFetch({
        fetchMock,
        url: `/entity/productfolder/${id}`,
        method: "PUT",
        body: {
          name: "Группа Овощи",
          code: "vegetableFolderCode",
          externalCode: "extVegCode",
          vat: 5,
        },
      });
    });
  });

  describe("delete", () => {
    it("deletes single product folder", async () => {
      const fetchMock = createFetchMock();
      const id = "7944ef04-f831-11e5-7a69-971500188b19";

      await moysklad.productFolder.delete(id);

      expectFetch({
        fetchMock,
        url: `/entity/productfolder/${id}`,
        method: "DELETE",
      });
    });

    it("deletes multiple product folders", async () => {
      const fetchMock = createFetchMock();
      const ids = [
        "7944ef04-f831-11e5-7a69-971500188b1",
        "7944ef04-f831-11e5-7a69-971500188b2",
      ];

      await moysklad.productFolder.batchDelete(ids);

      expectFetch({
        fetchMock,
        url: "/entity/productfolder/delete",
        method: "POST",
        body: ids.map((id) => ({
          meta: {
            href: `https://test-api.moysklad.ru/api/remap/1.2/entity/productfolder/${id}`,
            type: Entity.ProductFolder,
            mediaType: "application/json",
          },
        })),
      });
    });
  });

  describe("upsert", () => {
    it("creates new product folder", async () => {
      const fetchMock = createFetchMock();

      await moysklad.productFolder.upsert({
        name: "Овощи",
      });

      expectFetch({
        fetchMock,
        url: "/entity/productfolder",
        method: "POST",
        body: {
          name: "Овощи",
        },
      });
    });

    it("updates existing product folder", async () => {
      const fetchMock = createFetchMock();
      const id = "7944ef04-f831-11e5-7a69-971500188b19";

      await moysklad.productFolder.upsert({
        meta: {
          href: `https://test-api.moysklad.ru/api/remap/1.2/entity/productfolder/${id}`,
          type: Entity.ProductFolder,
          mediaType: "application/json",
        },
        name: "Группа Овощи",
      });

      expectFetch({
        fetchMock,
        url: "/entity/productfolder",
        method: "POST",
        body: {
          meta: {
            href: `https://test-api.moysklad.ru/api/remap/1.2/entity/productfolder/${id}`,
            type: Entity.ProductFolder,
            mediaType: "application/json",
          },
          name: "Группа Овощи",
        },
      });
    });

    it("creates and updates multiple product folders", async () => {
      const fetchMock = createFetchMock();
      const id = "7944ef04-f831-11e5-7a69-971500188b19";

      await moysklad.productFolder.upsert([
        {
          name: "Овощи",
        },
        {
          meta: {
            href: `https://test-api.moysklad.ru/api/remap/1.2/entity/productfolder/${id}`,
            type: Entity.ProductFolder,
            mediaType: "application/json",
          },
          name: "Группа Овощи",
          code: "vegetableFolderCode",
          externalCode: "extVegCode",
          vat: 5,
        },
      ]);

      expectFetch({
        fetchMock,
        url: "/entity/productfolder",
        method: "POST",
        body: [
          {
            name: "Овощи",
          },
          {
            meta: {
              href: `https://test-api.moysklad.ru/api/remap/1.2/entity/productfolder/${id}`,
              type: Entity.ProductFolder,
              mediaType: "application/json",
            },
            name: "Группа Овощи",
            code: "vegetableFolderCode",
            externalCode: "extVegCode",
            vat: 5,
          },
        ],
      });
    });
  });
});
