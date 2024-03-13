import { BaseEndpoint } from "../base-endpoint";
import {
  EntitiesActions,
  type WizardOptions,
  type WizardResult,
} from "./types";

const ENDPOINT_URL = "/wizard";

/**
 * Автозаполнение
 *
 * @link https://dev.moysklad.ru/doc/api/remap/1.2/documents/#dokumenty-awtozapolnenie
 */
export class WizardEndpoint extends BaseEndpoint {
  async execute<
    E extends keyof typeof EntitiesActions,
    A extends (typeof EntitiesActions)[E],
  >(entity: E, options: WizardOptions<A>): Promise<WizardResult<A>> {
    const response = await this.client.post(`${ENDPOINT_URL}/${entity}`, {
      searchParameters: new URLSearchParams({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        action: options.action,
      }),
      body: options,
    });

    return response.json();
  }
}
