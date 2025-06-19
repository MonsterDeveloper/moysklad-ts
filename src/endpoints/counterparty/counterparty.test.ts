import { describe, it, expect } from "vitest";
import { moysklad, createFetchMock, expectFetch } from "../../../test-utils";
import { CounterpartyCompanyType, IndividualCounterpartySex } from "./types";

describe("counterparty", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.counterparty.list();

      expectFetch({
        fetchMock,
        url: "/entity/counterparty",
        method: "GET",
      });
    });

    it("makes a request with options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.counterparty.list({
        pagination: { limit: 10, offset: 0 },
        expand: { owner: true, group: true },
        order: { field: "name", direction: "asc" },
        search: "ООО Ромашка",
        filter: {
          companyType: CounterpartyCompanyType.Legal,
          archived: false,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/counterparty",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "10",
          offset: "0",
          expand: "owner,group",
          order: "name,asc",
          search: "ООО Ромашка",
          filter: "companyType=legal;archived=false",
        }),
      });
    });

    it("makes a request with multiple order fields", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.counterparty.list({
        order: [
          { field: "name", direction: "asc" },
          { field: "created", direction: "desc" },
        ],
      });

      expectFetch({
        fetchMock,
        url: "/entity/counterparty",
        method: "GET",
        searchParameters: {
          order: "name,asc;created,desc",
        },
      });
    });

    it("makes a request with string order field", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.counterparty.list({
        order: "name",
      });

      expectFetch({
        fetchMock,
        url: "/entity/counterparty",
        method: "GET",
        searchParameters: {
          order: "name",
        },
      });
    });
  });

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.counterparty.all();

      // Check that the URL contains the expected path and parameters
      const firstCallUrl = fetchMock.mock.calls[0]?.[0] as string;
      expect(firstCallUrl).toContain("/entity/counterparty?limit=");
      expect(fetchMock.mock.calls[0]?.[1]).toMatchObject({
        method: "GET",
      });
    });

    it("makes a request with options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.counterparty.all({
        expand: { owner: true },
        order: { field: "name", direction: "asc" },
        search: "ООО Ромашка",
        filter: {
          companyType: CounterpartyCompanyType.Legal,
        },
      });

      // Check that the URL contains the expected path
      const firstCallUrl = fetchMock.mock.calls[0]?.[0] as string;
      expect(firstCallUrl).toContain("/entity/counterparty?");
      expect(fetchMock.mock.calls[0]?.[1]).toMatchObject({
        method: "GET",
      });

      const callUrl = new URL(firstCallUrl);
      expect(callUrl.searchParams.get("expand")).toBe("owner");
      expect(callUrl.searchParams.get("order")).toBe("name,asc");
      expect(callUrl.searchParams.get("search")).toBe("ООО Ромашка");
      expect(callUrl.searchParams.get("filter")).toBe("companyType=legal");
    });
  });

  describe("get", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.counterparty.get(id);

      expectFetch({
        fetchMock,
        url: `/entity/counterparty/${id}`,
        method: "GET",
      });
    });

    it("makes a request with options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";

      await moysklad.counterparty.get(id, {
        expand: { owner: true, group: true },
      });

      expectFetch({
        fetchMock,
        url: `/entity/counterparty/${id}`,
        method: "GET",
        searchParameters: expect.objectContaining({
          expand: "owner,group",
        }),
      });
    });
  });

  describe("update", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "ООО Ромашка",
        description: "Новое описание",
      };

      await moysklad.counterparty.update(id, data);

      expectFetch({
        fetchMock,
        url: `/entity/counterparty/${id}`,
        method: "PUT",
        body: data,
      });
    });

    it("makes a request with options", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "ООО Ромашка",
        description: "Новое описание",
      };

      await moysklad.counterparty.update(id, data, {
        expand: { owner: true },
      });

      expectFetch({
        fetchMock,
        url: `/entity/counterparty/${id}`,
        method: "PUT",
        body: data,
        searchParameters: expect.objectContaining({
          expand: "owner",
        }),
      });
    });

    it("updates a legal counterparty", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "ООО Ромашка",
        companyType: CounterpartyCompanyType.Legal,
        inn: "7736570901",
        kpp: "773601001",
        legalAddress: "г. Москва, ул. Ленина, д. 1",
        legalTitle: "Общество с ограниченной ответственностью 'Ромашка'",
      };

      await moysklad.counterparty.update(id, data);

      expectFetch({
        fetchMock,
        url: `/entity/counterparty/${id}`,
        method: "PUT",
        body: data,
      });
    });

    it("updates an entrepreneur counterparty", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "ИП Иванов",
        companyType: CounterpartyCompanyType.Entrepreneur,
        inn: "773601001001",
        legalFirstName: "Иван",
        legalLastName: "Иванов",
        legalMiddleName: "Иванович",
        ogrnip: "123456789012345",
      };

      await moysklad.counterparty.update(id, data);

      expectFetch({
        fetchMock,
        url: `/entity/counterparty/${id}`,
        method: "PUT",
        body: data,
      });
    });

    it("updates an individual counterparty", async () => {
      const fetchMock = createFetchMock();
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583";
      const data = {
        name: "Петров П.П.",
        companyType: CounterpartyCompanyType.Individual,
        legalFirstName: "Петр",
        legalLastName: "Петров",
        legalMiddleName: "Петрович",
        sex: IndividualCounterpartySex.Male,
      };

      await moysklad.counterparty.update(id, data);

      expectFetch({
        fetchMock,
        url: `/entity/counterparty/${id}`,
        method: "PUT",
        body: data,
      });
    });
  });

  describe("first", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.counterparty.first();

      expectFetch({
        fetchMock,
        url: "/entity/counterparty",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      });
    });

    it("makes a request with options", async () => {
      const fetchMock = createFetchMock(true);

      await moysklad.counterparty.first({
        expand: { owner: true },
        order: { field: "name", direction: "asc" },
        search: "ООО Ромашка",
        filter: {
          companyType: CounterpartyCompanyType.Legal,
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/counterparty",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "1",
          expand: "owner",
          order: "name,asc",
          search: "ООО Ромашка",
          filter: "companyType=legal",
        }),
      });
    });
  });

  describe("size", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock();

      await moysklad.counterparty.size();

      expectFetch({
        fetchMock,
        url: "/entity/counterparty",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      });
    });

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock();

      await moysklad.counterparty.size({
        filter: {
          name: "Test Counterparty",
        },
      });

      expectFetch({
        fetchMock,
        url: "/entity/counterparty",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "name=Test Counterparty",
          limit: "0",
        }),
      });
    });
  });

  describe("upsert", () => {
    it("creates a new counterparty", async () => {
      const fetchMock = createFetchMock();
      const data = {
        name: "ООО Ромашка",
        companyType: CounterpartyCompanyType.Legal,
        inn: "7736570901",
        kpp: "773601001",
      };

      await moysklad.counterparty.upsert(data);

      expectFetch({
        fetchMock,
        url: "/entity/counterparty",
        method: "POST",
        body: data,
      });
    });

    it("updates an existing counterparty", async () => {
      const fetchMock = createFetchMock();
      const data = {
        id: "5427bc76-b95f-11eb-0a80-04bb000cd583",
        name: "ООО Ромашка",
        companyType: CounterpartyCompanyType.Legal,
        inn: "7736570901",
        kpp: "773601001",
      };

      await moysklad.counterparty.upsert(data);

      expectFetch({
        fetchMock,
        url: "/entity/counterparty",
        method: "POST",
        body: data,
      });
    });

    it("makes a request with options", async () => {
      const fetchMock = createFetchMock();
      const data = {
        name: "ООО Ромашка",
        companyType: CounterpartyCompanyType.Legal,
      };

      await moysklad.counterparty.upsert(data, {
        expand: { owner: true },
      });

      expectFetch({
        fetchMock,
        url: "/entity/counterparty",
        method: "POST",
        body: data,
        searchParameters: expect.objectContaining({
          expand: "owner",
        }),
      });
    });

    it("handles array of counterparties", async () => {
      const fetchMock = createFetchMock();
      const data = [
        {
          name: "ООО Ромашка",
          companyType: CounterpartyCompanyType.Legal,
        },
        {
          name: "ИП Иванов",
          companyType: CounterpartyCompanyType.Entrepreneur,
        },
      ];

      await moysklad.counterparty.upsert(data);

      expectFetch({
        fetchMock,
        url: "/entity/counterparty",
        method: "POST",
        body: data,
      });
    });

    it("creates a legal counterparty with full data", async () => {
      const fetchMock = createFetchMock();
      const data = {
        name: "ООО Ромашка",
        companyType: CounterpartyCompanyType.Legal,
        inn: "7736570901",
        kpp: "773601001",
        legalAddress: "г. Москва, ул. Ленина, д. 1",
        legalTitle: "Общество с ограниченной ответственностью 'Ромашка'",
        ogrn: "1234567890123",
        okpo: "12345678",
        actualAddress: "г. Москва, ул. Ленина, д. 1, офис 123",
        description: "Поставщик канцелярских товаров",
        email: "info@romashka.ru",
        phone: "+7 (495) 123-45-67",
        fax: "+7 (495) 123-45-68",
        code: "supplier-001",
        externalCode: "supplier-001-external",
        archived: false,
        tags: ["поставщик", "канцтовары"],
      };

      await moysklad.counterparty.upsert(data);

      expectFetch({
        fetchMock,
        url: "/entity/counterparty",
        method: "POST",
        body: data,
      });
    });

    it("creates an entrepreneur counterparty with full data", async () => {
      const fetchMock = createFetchMock();
      const data = {
        name: "ИП Иванов",
        companyType: CounterpartyCompanyType.Entrepreneur,
        inn: "773601001001",
        legalFirstName: "Иван",
        legalLastName: "Иванов",
        legalMiddleName: "Иванович",
        legalTitle: "Индивидуальный предприниматель Иванов Иван Иванович",
        ogrnip: "123456789012345",
        okpo: "0987654321",
        certificateNumber: "123456789",
        certificateDate: "2020-01-01",
        email: "ivanov@example.com",
        phone: "+7 (495) 987-65-43",
      };

      await moysklad.counterparty.upsert(data);

      expectFetch({
        fetchMock,
        url: "/entity/counterparty",
        method: "POST",
        body: data,
      });
    });

    it("creates an individual counterparty with full data", async () => {
      const fetchMock = createFetchMock();
      const data = {
        name: "Петров П.П.",
        companyType: CounterpartyCompanyType.Individual,
        legalFirstName: "Петр",
        legalLastName: "Петров",
        legalMiddleName: "Петрович",
        legalTitle: "Петров Петр Петрович",
        sex: IndividualCounterpartySex.Male,
        birthDate: "1980-01-01",
        inn: "123456789012",
        phone: "+7 (495) 111-22-33",
        email: "petrov@example.com",
      };

      await moysklad.counterparty.upsert(data);

      expectFetch({
        fetchMock,
        url: "/entity/counterparty",
        method: "POST",
        body: data,
      });
    });
  });
});
