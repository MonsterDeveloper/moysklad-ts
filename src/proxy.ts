// Proxy inspired by https://github.com/honojs/hono/blob/5e1f54caf99cc158b0d20dc02ed44d0a4a596842/src/client/client.ts

import {
  ApiClient,
  composeSearchParameters,
  type ApiClientOptions,
} from "./api-client";
import type { WizardOptions } from "./endpoints";
import type { Moysklad } from "./moysklad";
import { MediaType } from "./types";

type ComposeSearchParametersOptions = Parameters<
  typeof composeSearchParameters
>[0];

export type Callback = (options: CallbackOptions) => unknown;

interface CallbackOptions {
  path: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[];
}

const createProxy = (callback: Callback, path: string[]) => {
  const proxy: unknown = new Proxy(() => {}, {
    get(_object, key) {
      if (typeof key !== "string" || key === "then") {
        return;
      }
      return createProxy(callback, [...path, key]);
    },
    apply(_1, _2, arguments_) {
      return callback({
        path,
        args: arguments_,
      });
    },
  });
  return proxy;
};

/**
 * Создать клиент для работы с МойСклад
 *
 * @param options - Опции для запросов
 * @returns Экземпляр Moysklad
 *
 * {@linkcode ApiClientOptions}
 */
export const createMoysklad = (options: ApiClientOptions): Moysklad => {
  const client = new ApiClient(options);

  const list = (path: string, options?: ComposeSearchParametersOptions) => {
    const searchParameters = composeSearchParameters(options ?? {});

    return client
      .get(path, {
        searchParameters,
      })
      .then((response) => response.json());
  };

  return createProxy((callbackOptions) => {
    const parts = [...callbackOptions.path];

    if (parts[0] === "client" && parts.length === 2) {
      const function_ = Reflect.get(client, parts[1] as PropertyKey) as (
        ...arguments_: unknown[]
      ) => unknown;
      return Reflect.apply(function_, client, callbackOptions.args);
    }

    let method;
    let path;

    if (parts[0] === "report" || parts[0] === "wizard") {
      path = `/${parts.join("/").toLowerCase()}`;
    } else {
      method = parts.pop();
      path = `/entity/${parts.join("/").toLowerCase()}`;
    }

    if (parts[0] === "wizard") {
      const { action, ...body } = callbackOptions.args[0] as WizardOptions;
      return client
        .post(path, {
          searchParameters: new URLSearchParams({
            action,
          }),
          body,
        })
        .then((response) => response.json());
    }

    if (parts[0] === "report") {
      const options = callbackOptions.args[0] as
        | ComposeSearchParametersOptions
        | undefined;

      if (path === "/report/stock/allcurrent") {
        path = "/report/stock/all/current";
      }

      return client
        .get(path, {
          searchParameters: composeSearchParameters(options ?? {}),
        })
        .then((response) => response.json());
    }

    if (method === "list") {
      return list(
        path,
        callbackOptions.args[0] as ComposeSearchParametersOptions,
      );
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
      );
    }

    if (method === "first") {
      return list(path, {
        ...(callbackOptions.args[0] as
          | ComposeSearchParametersOptions
          | undefined),
        pagination: { limit: 1 },
      });
    }

    if (method === "size") {
      return list(path, {
        ...(callbackOptions.args[0] as
          | ComposeSearchParametersOptions
          | undefined),
        pagination: { limit: 0 },
      });
    }

    if (method === "get") {
      const id = callbackOptions.args[0] as string;
      const options = callbackOptions.args[1] as
        | ComposeSearchParametersOptions
        | undefined;

      return client
        .get(`${path}/${id}`, {
          searchParameters: composeSearchParameters(options ?? {}),
        })
        .then((response) => response.json());
    }

    if (method === "delete") {
      const id = callbackOptions.args[0] as string;

      return client.delete(`${path}/${id}`).then((response) => response.json());
    }

    if (method === "batchDelete") {
      const ids = callbackOptions.args[0] as string[];
      const entity = callbackOptions.path[0];

      return client
        .post(`${path}/delete`, {
          body: ids.map((id) => ({
            meta: {
              href: client.buildUrl(`${path}/${id}`),
              type: entity,
              mediaType: MediaType.Json,
            },
          })),
        })
        .then((response) => response.json());
    }

    if (method === "trash") {
      const id = callbackOptions.args[0] as string;

      return client
        .post(`${path}/${id}/trash`)
        .then((response) => response.json());
    }

    if (method === "upsert" || method === "create") {
      const data = callbackOptions.args[0] as object;
      const options = callbackOptions.args[1] as
        | ComposeSearchParametersOptions
        | undefined;

      return client
        .post(path, {
          body: data,
          searchParameters: composeSearchParameters(options ?? {}),
        })
        .then((response) => response.json());
    }

    if (method === "update") {
      const id = callbackOptions.args[0] as string;
      const data = callbackOptions.args[1] as object;
      const options = callbackOptions.args[2] as
        | ComposeSearchParametersOptions
        | undefined;

      return client
        .put(`${path}/${id}`, {
          body: data,
          searchParameters: composeSearchParameters(options ?? {}),
        })
        .then((response) => response.json());
    }

    if (method === "template") {
      const data = callbackOptions.args[0] as object;

      return client
        .put(`${path}/new`, {
          body: data,
        })
        .then((response) => response.json());
    }

    throw new Error(`Invalid request path: ${callbackOptions.path.join("/")}`);
  }, []) as Moysklad;
};
