import { describe, it } from "vitest"
import { moysklad } from "../../../test-utils"
import { Entity, MediaType } from "../../types"

describe("invoiceIn types", () => {
  it("accepts minimal and full metadata in nested request fields", async () => {
    const currency = moysklad.client.composeMeta(Entity.Currency, "currency-id")
    const minimalCurrency = {
      meta: {
        href: currency.meta.href,
        mediaType: currency.meta.mediaType,
        type: currency.meta.type,
      },
    }

    await moysklad.invoiceIn.create({
      agent: moysklad.client.composeMeta(Entity.Counterparty, "agent-id"),
      organization: moysklad.client.composeMeta(
        Entity.Organization,
        "organization-id",
      ),
      rate: { currency: minimalCurrency, value: 90 },
    })

    await moysklad.invoiceIn.create({
      agent: {
        meta: {
          href: "https://example.com/agent",
          metadataHref: "https://example.com/agent/metadata",
          mediaType: MediaType.Json,
          type: Entity.Counterparty,
        },
      },
      organization: moysklad.client.composeMeta(
        Entity.Organization,
        "organization-id",
      ),
      rate: {
        currency: {
          meta: {
            href: "https://example.com/currency",
            metadataHref: "https://example.com/currency/metadata",
            mediaType: MediaType.Json,
            type: Entity.Currency,
          },
        },
      },
    })
  })
})
