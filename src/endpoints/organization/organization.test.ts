import { describe, expect, it } from "vitest"
import { createFetchMock, expectFetch, moysklad } from "../../../test-utils"
import { OrganizationCompanyType } from "./types"

describe("organization", () => {
  describe("list", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.organization.list()

      expectFetch({
        fetchMock,
        url: "/entity/organization",
        method: "GET",
      })
    })

    it("makes a request with options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.organization.list({
        pagination: { limit: 10, offset: 0 },
        expand: { owner: true, group: true },
        order: { field: "name", direction: "asc" },
        search: "ООО Ромашка",
        filter: {
          companyType: OrganizationCompanyType.Legal,
          archived: false,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/organization",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "10",
          offset: "0",
          expand: "owner,group",
          order: "name,asc",
          search: "ООО Ромашка",
          filter: "companyType=legal;archived=false",
        }),
      })
    })

    it("makes a request with multiple order fields", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.organization.list({
        order: [
          { field: "name", direction: "asc" },
          { field: "created", direction: "desc" },
        ],
      })

      expectFetch({
        fetchMock,
        url: "/entity/organization",
        method: "GET",
        searchParameters: {
          order: "name,asc;created,desc",
        },
      })
    })

    it("makes a request with string order field", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.organization.list({
        order: "name",
      })

      expectFetch({
        fetchMock,
        url: "/entity/organization",
        method: "GET",
        searchParameters: {
          order: "name",
        },
      })
    })
  })

  describe("all", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.organization.all()

      const firstCallUrl = fetchMock.mock.calls[0]?.[0] as string
      expect(firstCallUrl).toContain("/entity/organization?limit=")
      expect(fetchMock.mock.calls[0]?.[1]).toMatchObject({
        method: "GET",
      })
    })

    it("makes a request with options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.organization.all({
        expand: { owner: true },
        order: { field: "name", direction: "asc" },
        search: "ООО Ромашка",
        filter: {
          companyType: OrganizationCompanyType.Legal,
        },
      })

      const firstCallUrl = fetchMock.mock.calls[0]?.[0] as string
      expect(firstCallUrl).toContain("/entity/organization?")
      expect(fetchMock.mock.calls[0]?.[1]).toMatchObject({
        method: "GET",
      })

      const callUrl = new URL(firstCallUrl)
      expect(callUrl.searchParams.get("expand")).toBe("owner")
      expect(callUrl.searchParams.get("order")).toBe("name,asc")
      expect(callUrl.searchParams.get("search")).toBe("ООО Ромашка")
      expect(callUrl.searchParams.get("filter")).toBe("companyType=legal")
    })
  })

  describe("get", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.organization.get(id)

      expectFetch({
        fetchMock,
        url: `/entity/organization/${id}`,
        method: "GET",
      })
    })

    it("makes a request with options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.organization.get(id, {
        expand: { owner: true, group: true },
      })

      expectFetch({
        fetchMock,
        url: `/entity/organization/${id}`,
        method: "GET",
        searchParameters: expect.objectContaining({
          expand: "owner,group",
        }),
      })
    })
  })

  describe("update", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        name: "ООО Ромашка",
        description: "Новое описание",
      }

      await moysklad.organization.update(id, data)

      expectFetch({
        fetchMock,
        url: `/entity/organization/${id}`,
        method: "PUT",
        body: data,
      })
    })

    it("makes a request with options", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        name: "ООО Ромашка",
        description: "Новое описание",
      }

      await moysklad.organization.update(id, data, {
        expand: { owner: true },
      })

      expectFetch({
        fetchMock,
        url: `/entity/organization/${id}`,
        method: "PUT",
        body: data,
        searchParameters: expect.objectContaining({
          expand: "owner",
        }),
      })
    })

    it("updates a legal organization", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        name: "ООО Ромашка",
        companyType: OrganizationCompanyType.Legal,
        inn: "7736570901",
        kpp: "773601001",
        legalAddress: "г. Москва, ул. Ленина, д. 1",
        legalTitle: "Общество с ограниченной ответственностью 'Ромашка'",
      }

      await moysklad.organization.update(id, data)

      expectFetch({
        fetchMock,
        url: `/entity/organization/${id}`,
        method: "PUT",
        body: data,
      })
    })

    it("updates an entrepreneur organization", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        name: "ИП Иванов",
        companyType: OrganizationCompanyType.Entrepreneur,
        inn: "773601001001",
        legalFirstName: "Иван",
        legalLastName: "Иванов",
        legalMiddleName: "Иванович",
        ogrnip: "123456789012345",
      }

      await moysklad.organization.update(id, data)

      expectFetch({
        fetchMock,
        url: `/entity/organization/${id}`,
        method: "PUT",
        body: data,
      })
    })

    it("updates an individual organization", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = {
        name: "Петров П.П.",
        companyType: OrganizationCompanyType.Individual,
        legalFirstName: "Петр",
        legalLastName: "Петров",
        legalMiddleName: "Петрович",
      }

      await moysklad.organization.update(id, data)

      expectFetch({
        fetchMock,
        url: `/entity/organization/${id}`,
        method: "PUT",
        body: data,
      })
    })
  })

  describe("first", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.organization.first()

      expectFetch({
        fetchMock,
        url: "/entity/organization",
        method: "GET",
        searchParameters: {
          limit: "1",
        },
      })
    })

    it("makes a request with options", async () => {
      const fetchMock = createFetchMock(true)

      await moysklad.organization.first({
        expand: { owner: true },
        order: { field: "name", direction: "asc" },
        search: "ООО Ромашка",
        filter: {
          companyType: OrganizationCompanyType.Legal,
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/organization",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "1",
          expand: "owner",
          order: "name,asc",
          search: "ООО Ромашка",
          filter: "companyType=legal",
        }),
      })
    })
  })

  describe("size", () => {
    it("makes a request", async () => {
      const fetchMock = createFetchMock()

      await moysklad.organization.size()

      expectFetch({
        fetchMock,
        url: "/entity/organization",
        method: "GET",
        searchParameters: expect.objectContaining({
          limit: "0",
        }),
      })
    })

    it("makes a request with filter options", async () => {
      const fetchMock = createFetchMock()

      await moysklad.organization.size({
        filter: {
          name: "Test Organization",
        },
      })

      expectFetch({
        fetchMock,
        url: "/entity/organization",
        method: "GET",
        searchParameters: expect.objectContaining({
          filter: "name=Test Organization",
          limit: "0",
        }),
      })
    })
  })

  describe("delete", () => {
    it("deletes an organization", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.organization.delete(id)

      expectFetch({
        fetchMock,
        url: `/entity/organization/${id}`,
        method: "DELETE",
      })
    })
  })

  describe("batchDelete", () => {
    it("batch deletes organizations", async () => {
      const fetchMock = createFetchMock()
      const ids = [
        "5427bc76-b95f-11eb-0a80-04bb000cd583",
        "5427bc76-b95f-11eb-0a80-04bb000cd584",
      ]

      await moysklad.organization.batchDelete(ids)

      expectFetch({
        fetchMock,
        url: "/entity/organization/delete",
        method: "POST",
        body: ids.map((id) => ({
          meta: {
            href: `https://test-api.moysklad.ru/api/remap/1.2/entity/organization/${id}`,
            type: "organization",
            mediaType: "application/json",
          },
        })),
      })
    })
  })

  describe("upsert", () => {
    it("creates a new organization", async () => {
      const fetchMock = createFetchMock()
      const data = {
        name: "ООО Ромашка",
        companyType: OrganizationCompanyType.Legal,
        inn: "7736570901",
        kpp: "773601001",
      }

      await moysklad.organization.upsert(data)

      expectFetch({
        fetchMock,
        url: "/entity/organization",
        method: "POST",
        body: data,
      })
    })

    it("updates an existing organization", async () => {
      const fetchMock = createFetchMock()
      const data = {
        id: "5427bc76-b95f-11eb-0a80-04bb000cd583",
        name: "ООО Ромашка",
        companyType: OrganizationCompanyType.Legal,
        inn: "7736570901",
        kpp: "773601001",
      }

      await moysklad.organization.upsert(data)

      expectFetch({
        fetchMock,
        url: "/entity/organization",
        method: "POST",
        body: data,
      })
    })

    it("makes a request with options", async () => {
      const fetchMock = createFetchMock()
      const data = {
        name: "ООО Ромашка",
        companyType: OrganizationCompanyType.Legal,
      }

      await moysklad.organization.upsert(data, {
        expand: { owner: true },
      })

      expectFetch({
        fetchMock,
        url: "/entity/organization",
        method: "POST",
        body: data,
        searchParameters: expect.objectContaining({
          expand: "owner",
        }),
      })
    })

    it("handles array of organizations", async () => {
      const fetchMock = createFetchMock()
      const data = [
        {
          name: "ООО Ромашка",
          companyType: OrganizationCompanyType.Legal,
        },
        {
          name: "ИП Иванов",
          companyType: OrganizationCompanyType.Entrepreneur,
        },
      ]

      await moysklad.organization.upsert(data)

      expectFetch({
        fetchMock,
        url: "/entity/organization",
        method: "POST",
        body: data,
      })
    })

    it("creates a legal organization with full data", async () => {
      const fetchMock = createFetchMock()
      const data = {
        name: "ООО Ромашка",
        companyType: OrganizationCompanyType.Legal,
        inn: "7736570901",
        kpp: "773601001",
        legalAddress: "г. Москва, ул. Ленина, д. 1",
        legalTitle: "Общество с ограниченной ответственностью 'Ромашка'",
        ogrn: "1234567890123",
        okpo: "12345678",
        actualAddress: "г. Москва, ул. Ленина, д. 1, офис 123",
        description: "Основная организация",
        email: "info@romashka.ru",
        phone: "+7 (495) 123-45-67",
        fax: "+7 (495) 123-45-68",
        code: "org-001",
        externalCode: "org-001-external",
        archived: false,
        payerVat: true,
        director: "Иванов И.И.",
        directorPosition: "Генеральный директор",
        chiefAccountant: "Петрова А.А.",
      }

      await moysklad.organization.upsert(data)

      expectFetch({
        fetchMock,
        url: "/entity/organization",
        method: "POST",
        body: data,
      })
    })

    it("creates an entrepreneur organization with full data", async () => {
      const fetchMock = createFetchMock()
      const data = {
        name: "ИП Иванов",
        companyType: OrganizationCompanyType.Entrepreneur,
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
      }

      await moysklad.organization.upsert(data)

      expectFetch({
        fetchMock,
        url: "/entity/organization",
        method: "POST",
        body: data,
      })
    })

    it("creates an individual organization with full data", async () => {
      const fetchMock = createFetchMock()
      const data = {
        name: "Петров П.П.",
        companyType: OrganizationCompanyType.Individual,
        legalFirstName: "Петр",
        legalLastName: "Петров",
        legalMiddleName: "Петрович",
        legalTitle: "Петров Петр Петрович",
        inn: "123456789012",
        phone: "+7 (495) 111-22-33",
        email: "petrov@example.com",
      }

      await moysklad.organization.upsert(data)

      expectFetch({
        fetchMock,
        url: "/entity/organization",
        method: "POST",
        body: data,
      })
    })
  })

  describe("listAccounts", () => {
    it("makes a request without options", async () => {
      const fetchMock = createFetchMock(true)
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"

      await moysklad.organization.listAccounts(id)

      expectFetch({
        fetchMock,
        url: `/entity/organization/${id}/accounts`,
        method: "GET",
      })
    })
  })

  describe("updateAccounts", () => {
    it("updates accounts", async () => {
      const fetchMock = createFetchMock()
      const id = "5427bc76-b95f-11eb-0a80-04bb000cd583"
      const data = [
        {
          accountNumber: "40702810001234567890",
          isDefault: true,
          bankName: "ПАО Сбербанк",
          bic: "044525225",
        },
      ]

      await moysklad.organization.updateAccounts(id, data)

      expectFetch({
        fetchMock,
        url: `/entity/organization/${id}/accounts`,
        method: "POST",
        body: data,
      })
    })
  })
})
