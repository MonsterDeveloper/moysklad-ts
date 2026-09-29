import { describe, expectTypeOf, it } from "vitest"
import { moysklad } from "../../test-utils"
import type { AttachedFile, FilesListResponse } from "./files"

describe("file method types", () => {
  it("returns typed file responses", async () => {
    const page = await moysklad.invoiceIn.listFiles("invoice-id")
    const files = await moysklad.invoiceIn.addFiles("invoice-id", [
      { filename: "invoice.pdf", content: new Uint8Array([1, 2, 3]) },
    ])
    await moysklad.invoiceIn.deleteFile("invoice-id", "file-id")

    expectTypeOf(page).toEqualTypeOf<FilesListResponse>()
    expectTypeOf(files).toEqualTypeOf<AttachedFile[]>()
  })
})
