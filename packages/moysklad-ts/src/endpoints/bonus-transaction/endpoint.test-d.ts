import { ApiClient } from "@/api-client";
import { assertType, describe, it } from "vitest";
import { BonusTransactionEndpoint } from "./endpoint";

export interface ExpectedListResponse {
  context: {
    employee: {
      meta: {
        href: string;
        metadataHref: string;
        type: string;
        mediaType: "application/json";
      };
    };
  };
  meta: {
    href: string;
    metadataHref: string;
    type: string;
    mediaType: "application/json";
    size: number;
    limit: number;
    offset: number;
  };
  rows: {
    meta: {
      href: string;
      metadataHref: string;
      type: string;
      mediaType: "application/json";
    };
    id: string;
    accountId: string;
    owner: {
      meta: {
        href: string;
        metadataHref: string;
        type: string;
        mediaType: "application/json";
      };
    };
    shared: boolean;
    group: {
      meta: {
        href: string;
        metadataHref: string;
        type: string;
        mediaType: "application/json";
      };
    };
    updated: string;
    name: string;
    externalCode: string;
    moment: string;
    applicable: boolean;
    agent: {
      meta: {
        href: string;
        metadataHref: string;
        type: string;
        mediaType: "application/json";
      };
    };
    created: string;
    bonusProgram: {
      meta: {
        href: string;
        metadataHref: string;
        type: string;
        mediaType: "application/json";
      };
    };
    bonusValue: number;
    transactionType: string;
    transactionStatus: string;
    executionDate: string;
    categoryType: string;
  }[];
}

describe("BonusTransactionEndpoint", () => {
  const client = new ApiClient({ auth: { token: "test-token" } });
  const endpoint = new BonusTransactionEndpoint(client);

  it("should return a list of bonus transactions", async () => {
    const response = await endpoint.list();

    assertType<ExpectedListResponse>(response);
  });
});
