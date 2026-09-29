import { describe, it } from "vitest"
import { moysklad } from "../../../test-utils"
import { Entity } from "../../types"

describe("payment operation types", () => {
  it("reuses response fields and accepts single-layer metadata", async () => {
    const payment = await moysklad.paymentOut.get("payment-id")
    const operations = payment.operations ?? []

    await moysklad.paymentOut.update("payment-id", {
      noClosingDocs: false,
      rate: payment.rate,
      operations: [
        ...operations,
        {
          meta: moysklad.client.composeMeta(Entity.InvoiceIn, "invoice-id")
            .meta,
          linkedSum: 10_000,
        },
      ],
    })

    await moysklad.paymentIn.update("payment-id", {
      operations: [
        {
          meta: moysklad.client.composeMeta(Entity.Demand, "demand-id").meta,
          linkedSum: 5_000,
        },
      ],
    })

    await moysklad.paymentOut.update("payment-id", {
      operations: [
        {
          // @ts-expect-error outgoing payments cannot reference demands
          meta: moysklad.client.composeMeta(Entity.Demand, "demand-id").meta,
        },
      ],
    })
  })
})
