// Proxy inspired by https://github.com/honojs/hono/blob/5e1f54caf99cc158b0d20dc02ed44d0a4a596842/src/client/client.ts

import {
  ApiClient,
  type ApiClientOptions,
  composeSearchParameters,
} from "./api-client"
import { isRootEntity } from "./api-client/metadata-owner"
import type { WizardOptions } from "./endpoints"
import type { Moysklad } from "./moysklad"
import { type AttachedFile, type FileUpload, MediaType } from "./types"

type ComposeSearchParametersOptions = Parameters<
  typeof composeSearchParameters
>[0]

type Callback = (options: CallbackOptions) => unknown

interface CallbackOptions {
  path: string[]
  // biome-ignore lint/suspicious/noExplicitAny: we don't know the args yet
  args: any[]
}

const FILE_UPLOAD_CHUNK_SIZE = 10
const FILE_UPLOAD_LIMIT = 100
const BYTE_ENCODING_CHUNK_SIZE = 32_768

function encodeBytesToBase64(bytes: Uint8Array): string {
  let binary = ""

  for (
    let offset = 0;
    offset < bytes.length;
    offset += BYTE_ENCODING_CHUNK_SIZE
  ) {
    binary += String.fromCharCode(
      ...bytes.subarray(offset, offset + BYTE_ENCODING_CHUNK_SIZE),
    )
  }

  return btoa(binary)
}

function prepareFileUploads(files: FileUpload[]): Array<{
  filename: string
  content: string
}> {
  return files.map((file) => ({
    filename: file.filename,
    content:
      typeof file.content === "string"
        ? file.content
        : encodeBytesToBase64(file.content),
  }))
}

const createProxy = (client: ApiClient, callback: Callback, path: string[]) => {
  // biome-ignore lint/suspicious/noEmptyBlockStatements: no-op
  const proxy: unknown = new Proxy(() => {}, {
    get(_object, key) {
      if (key === "client" && path.length === 0) {
        return client
      }

      if (typeof key !== "string" || key === "then") {
        return
      }
      return createProxy(client, callback, [...path, key])
    },
    apply(_1, _2, arguments_) {
      return callback({
        path,
        args: arguments_,
      })
    },
  })
  return proxy
}

/*
 * Создать API клиент для работы с МойСклад
 *
 * @param options - Опции для запросов {@linkcode ApiClientOptions}
 * @returns API клиент МойСклад
 *
 * @example
 * ```ts
 * const moysklad = createMoysklad({
 *   auth: {
 *     token: "<Ключ доступа к API МойСклад>"
 *   }
 * });
 * ```
 */
export const createMoysklad = (options: ApiClientOptions): Moysklad => {
  const client = new ApiClient(options)

  const composeEndpointSearchParameters = (
    path: string,
    options?: ComposeSearchParametersOptions,
  ): URLSearchParams | undefined =>
    composeSearchParameters(options ?? {}, {
      endpoint: path,
      buildUrl: (url: string | string[]): URL => client.buildUrl(url),
    })

  const list = (path: string, options?: ComposeSearchParametersOptions) => {
    const searchParameters = composeEndpointSearchParameters(path, options)

    return client
      .get(path, {
        searchParameters,
      })
      .then((response) => response.json())
  }

  // TODO refactor & simplify
  return createProxy(
    client,
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: todo
    (callbackOptions) => {
      const parts = [...callbackOptions.path]

      let method: string | undefined
      let path: string | undefined

      if (parts[0] === "report" || parts[0] === "wizard") {
        path = `/${parts.join("/").toLowerCase()}`
      } else {
        method = parts.pop()
        path = `/entity/${parts.join("/").toLowerCase()}`
      }

      if (parts[0] === "wizard") {
        const { action, ...body } = callbackOptions.args[0] as WizardOptions
        return client
          .post(path, {
            searchParameters: new URLSearchParams({
              action,
            }),
            body,
          })
          .then((response) => response.json())
      }

      if (parts[0] === "report") {
        const options = callbackOptions.args[0] as
          | ComposeSearchParametersOptions
          | undefined

        if (path === "/report/stock/allcurrent") {
          path = "/report/stock/all/current"
        }

        return client
          .get(path, {
            searchParameters: composeSearchParameters(options ?? {}),
          })
          .then((response) => response.json())
      }

      if (method === "list") {
        return list(
          path,
          callbackOptions.args[0] as ComposeSearchParametersOptions,
        )
      }

      if (method === "all") {
        return client.batchGet(
          async (limit, offset) =>
            list(path, {
              ...(callbackOptions.args[0] as
                | ComposeSearchParametersOptions
                | undefined),
              pagination: { limit, offset },
            }),
          Boolean(
            (
              callbackOptions.args[0] as
                | ComposeSearchParametersOptions
                | undefined
            )?.expand,
          ),
        )
      }

      if (method === "first") {
        return list(path, {
          ...(callbackOptions.args[0] as
            | ComposeSearchParametersOptions
            | undefined),
          pagination: { limit: 1 },
        })
      }

      if (method === "size") {
        return list(path, {
          ...(callbackOptions.args[0] as
            | ComposeSearchParametersOptions
            | undefined),
          pagination: { limit: 0 },
        })
      }

      if (method === "get") {
        const id = callbackOptions.args[0] as string
        const options = callbackOptions.args[1] as
          | ComposeSearchParametersOptions
          | undefined

        return client
          .get(`${path}/${id}`, {
            searchParameters: composeEndpointSearchParameters(path, options),
          })
          .then((response) => response.json())
      }

      if (method === "delete") {
        const id = callbackOptions.args[0] as string

        return client.delete(`${path}/${id}`).then((): void => undefined)
      }

      if (method === "batchDelete") {
        const ids = callbackOptions.args[0] as string[]
        const entity = callbackOptions.path[0].toLowerCase()
        const rootEntity =
          callbackOptions.path.length === 2 && isRootEntity(entity)
            ? entity
            : undefined

        return client
          .post(`${path}/delete`, {
            body: ids.map((id) => {
              if (rootEntity) {
                const composed = client.composeMeta(rootEntity, id).meta
                return {
                  meta: {
                    href: composed.href,
                    type: composed.type,
                    mediaType: composed.mediaType,
                  },
                }
              }

              return {
                meta: {
                  href: client.buildUrl(`${path}/${id}`),
                  type: entity,
                  mediaType: MediaType.Json,
                },
              }
            }),
          })
          .then((response) => response.json())
      }

      if (method === "trash") {
        const id = callbackOptions.args[0] as string

        return client.post(`${path}/${id}/trash`).then((): void => undefined)
      }

      if (method === "upsert" || method === "create") {
        const data = callbackOptions.args[0] as object
        const options = callbackOptions.args[1] as
          | ComposeSearchParametersOptions
          | undefined

        return client
          .post(path, {
            body: data,
            searchParameters: composeEndpointSearchParameters(path, options),
          })
          .then((response) => response.json())
      }

      if (method === "update") {
        const id = callbackOptions.args[0] as string
        const data = callbackOptions.args[1] as object
        const options = callbackOptions.args[2] as
          | ComposeSearchParametersOptions
          | undefined

        return client
          .put(`${path}/${id}`, {
            body: data,
            searchParameters: composeEndpointSearchParameters(path, options),
          })
          .then((response) => response.json())
      }

      if (method === "template") {
        const data = callbackOptions.args[0] as object

        return client
          .put(`${path}/new`, {
            body: data,
          })
          .then((response) => response.json())
      }

      if (method === "listAccounts") {
        const id = callbackOptions.args[0] as string
        const options = callbackOptions.args[1] as
          | ComposeSearchParametersOptions
          | undefined

        return client
          .get(`${path}/${id}/accounts`, {
            searchParameters: composeEndpointSearchParameters(path, options),
          })
          .then((response) => response.json())
      }

      if (method === "updateAccounts") {
        const id = callbackOptions.args[0] as string
        const data = callbackOptions.args[1] as object

        return client
          .post(`${path}/${id}/accounts`, {
            body: data,
          })
          .then((response) => response.json())
      }

      if (method === "listFiles") {
        const id = callbackOptions.args[0] as string
        const options = callbackOptions.args[1] as
          | ComposeSearchParametersOptions
          | undefined

        return client
          .get(`${path}/${id}/files`, {
            searchParameters: composeEndpointSearchParameters(path, options),
          })
          .then((response) => response.json())
      }

      if (method === "addFiles") {
        const id = callbackOptions.args[0] as string
        const files = callbackOptions.args[1] as FileUpload[]

        if (files.length > FILE_UPLOAD_LIMIT) {
          return Promise.reject(
            new RangeError(
              `Cannot add more than ${FILE_UPLOAD_LIMIT} files at once`,
            ),
          )
        }

        if (files.length === 0) {
          return client
            .get(`${path}/${id}/files`)
            .then((response) => response.json())
            .then((response: { rows: AttachedFile[] }) => response.rows)
        }

        return (async (): Promise<AttachedFile[]> => {
          let attachedFiles: AttachedFile[] = []

          for (
            let offset = 0;
            offset < files.length;
            offset += FILE_UPLOAD_CHUNK_SIZE
          ) {
            const chunk = files.slice(offset, offset + FILE_UPLOAD_CHUNK_SIZE)
            const response = await client.post(`${path}/${id}/files`, {
              body: prepareFileUploads(chunk),
            })
            attachedFiles = (await response.json()) as AttachedFile[]
          }

          return attachedFiles
        })()
      }

      if (method === "deleteFile") {
        const id = callbackOptions.args[0] as string
        const fileId = callbackOptions.args[1] as string

        return client
          .delete(`${path}/${id}/files/${fileId}`)
          .then((): void => undefined)
      }

      if (method === "audit") {
        const id = callbackOptions.args[0] as string
        const options = callbackOptions.args[1] as
          | ComposeSearchParametersOptions
          | undefined

        return client
          .get(`${path}/${id}/audit`, {
            searchParameters: composeEndpointSearchParameters(path, options),
          })
          .then((response) => response.json())
      }

      if (method === "metadata") {
        return client
          .get(`${path}/metadata`)
          .then((response) => response.json())
      }

      throw new Error(`Invalid request path: ${callbackOptions.path.join("/")}`)
    },
    [],
  ) as Moysklad
}
