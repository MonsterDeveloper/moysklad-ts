import { describe, it } from "vitest"
import { createFetchMock, expectFetch, moysklad } from "../../../test-utils"
import { Entity, MediaType, type UpdateMeta } from "../../types"

const organization: UpdateMeta<Entity.Organization> = {
  meta: {
    href: "https://test-api.moysklad.ru/api/remap/1.2/entity/organization/org-id",
    mediaType: MediaType.Json,
    type: Entity.Organization,
  },
}
const agent: UpdateMeta<Entity.Counterparty> = {
  meta: {
    href: "https://test-api.moysklad.ru/api/remap/1.2/entity/counterparty/agent-id",
    mediaType: MediaType.Json,
    type: Entity.Counterparty,
  },
}

describe("invoiceIn", () => {
  it("lists invoices with filters", async (): Promise<void> => {
    const fetchMock: ReturnType<typeof createFetchMock> = createFetchMock()

    await moysklad.invoiceIn.list({
      filter: { incomingNumber: "42", applicable: true },
    })

    await expectFetch({
      fetchMock,
      url: "/entity/invoicein",
      searchParameters: { filter: "incomingNumber=42;applicable=true" },
    })
  })

  it("gets all invoices", async (): Promise<void> => {
    const fetchMock: ReturnType<typeof createFetchMock> = createFetchMock(true)

    await moysklad.invoiceIn.all()

    await expectFetch({
      fetchMock,
      url: "/entity/invoicein",
      searchParameters: { limit: "1000", offset: "0" },
    })
  })

  it("gets the first invoice", async (): Promise<void> => {
    const fetchMock: ReturnType<typeof createFetchMock> = createFetchMock()

    await moysklad.invoiceIn.first()

    await expectFetch({
      fetchMock,
      url: "/entity/invoicein",
      searchParameters: { limit: "1" },
    })
  })

  it("gets an invoice with positions", async (): Promise<void> => {
    const fetchMock: ReturnType<typeof createFetchMock> = createFetchMock()

    await moysklad.invoiceIn.get("invoice-id", {
      expand: { positions: true },
      fields: ["stock"],
    })

    await expectFetch({
      fetchMock,
      url: "/entity/invoicein/invoice-id",
      searchParameters: { expand: "positions", fields: "stock", limit: "100" },
    })
  })

  it("creates an invoice", async (): Promise<void> => {
    const fetchMock: ReturnType<typeof createFetchMock> = createFetchMock()

    await moysklad.invoiceIn.create({ organization, agent })

    await expectFetch({
      fetchMock,
      url: "/entity/invoicein",
      method: "POST",
      body: { organization, agent },
    })
  })

  it("updates an invoice", async (): Promise<void> => {
    const fetchMock: ReturnType<typeof createFetchMock> = createFetchMock()

    await moysklad.invoiceIn.update("invoice-id", { incomingNumber: "42" })

    await expectFetch({
      fetchMock,
      url: "/entity/invoicein/invoice-id",
      method: "PUT",
      body: { incomingNumber: "42" },
    })
  })

  it("upserts invoices", async (): Promise<void> => {
    const fetchMock: ReturnType<typeof createFetchMock> = createFetchMock()
    const data: Parameters<typeof moysklad.invoiceIn.upsert>[0] = [
      { organization, agent },
      {
        meta: {
          href: "https://test-api.moysklad.ru/api/remap/1.2/entity/invoicein/invoice-id",
          mediaType: MediaType.Json,
          type: Entity.InvoiceIn,
        },
        name: "Updated invoice",
      },
    ]

    await moysklad.invoiceIn.upsert(data)

    await expectFetch({
      fetchMock,
      url: "/entity/invoicein",
      method: "POST",
      body: data,
    })
  })

  it("gets invoice count", async (): Promise<void> => {
    const fetchMock: ReturnType<typeof createFetchMock> = createFetchMock()

    await moysklad.invoiceIn.size()

    await expectFetch({
      fetchMock,
      url: "/entity/invoicein",
      searchParameters: { limit: "0" },
    })
  })

  it("deletes an invoice", async (): Promise<void> => {
    const fetchMock: ReturnType<typeof createFetchMock> = createFetchMock()

    await moysklad.invoiceIn.delete("invoice-id")

    await expectFetch({
      fetchMock,
      url: "/entity/invoicein/invoice-id",
      method: "DELETE",
    })
  })

  it("deletes invoices in a batch", async (): Promise<void> => {
    const fetchMock: ReturnType<typeof createFetchMock> = createFetchMock()

    await moysklad.invoiceIn.batchDelete(["invoice-id"])

    await expectFetch({
      fetchMock,
      url: "/entity/invoicein/delete",
      method: "POST",
      body: [
        {
          meta: {
            href: "https://test-api.moysklad.ru/api/remap/1.2/entity/invoicein/invoice-id",
            type: Entity.InvoiceIn,
            mediaType: MediaType.Json,
          },
        },
      ],
    })
  })

  it("gets the default template", async (): Promise<void> => {
    const fetchMock: ReturnType<typeof createFetchMock> = createFetchMock()

    await moysklad.invoiceIn.template()

    await expectFetch({
      fetchMock,
      url: "/entity/invoicein/new",
      method: "PUT",
    })
  })

  it("gets a template from supplies", async (): Promise<void> => {
    const fetchMock: ReturnType<typeof createFetchMock> = createFetchMock()
    const supplies: UpdateMeta<Entity.Supply>[] = [
      {
        meta: {
          href: "https://test-api.moysklad.ru/api/remap/1.2/entity/supply/supply-id",
          mediaType: MediaType.Json,
          type: Entity.Supply,
        },
      },
    ]

    await moysklad.invoiceIn.template({ supplies })

    await expectFetch({
      fetchMock,
      url: "/entity/invoicein/new",
      method: "PUT",
      body: { supplies },
    })
  })

  it("gets a template from a purchase order", async (): Promise<void> => {
    const fetchMock: ReturnType<typeof createFetchMock> = createFetchMock()
    const purchaseOrder: UpdateMeta<Entity.PurchaseOrder> = {
      meta: {
        href: "https://test-api.moysklad.ru/api/remap/1.2/entity/purchaseorder/order-id",
        mediaType: MediaType.Json,
        type: Entity.PurchaseOrder,
      },
    }

    await moysklad.invoiceIn.template({ purchaseOrder })

    await expectFetch({
      fetchMock,
      url: "/entity/invoicein/new",
      method: "PUT",
      body: { purchaseOrder },
    })
  })
})
