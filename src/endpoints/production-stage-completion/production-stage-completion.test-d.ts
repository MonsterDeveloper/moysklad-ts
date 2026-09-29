import { describe, it } from "vitest"
import { moysklad } from "../../../test-utils"
import { Entity } from "../../types"

describe("productionStageCompletion filter types", () => {
  it("accepts production task URL equality arrays", async () => {
    const firstTask = moysklad.client.composeMeta(
      Entity.ProductionTask,
      "first-task-id",
    ).meta.href
    const secondTask = moysklad.client.composeMeta(
      Entity.ProductionTask,
      "second-task-id",
    ).meta.href

    await moysklad.productionStageCompletion.list({
      filter: {
        productionTask: { eq: [firstTask, secondTask] },
      },
    })
  })
})
