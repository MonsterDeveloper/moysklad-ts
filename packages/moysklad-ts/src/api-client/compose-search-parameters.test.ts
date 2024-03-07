/* eslint-disable sonarjs/no-duplicate-string */
import { describe, it, expect } from "vitest";
import { composeSearchParameters } from "./compose-search-parameters";

describe("composeSearchParameters", () => {
  it("should return undefined if no options are provided", () => {
    expect(composeSearchParameters({})).toBeUndefined();
  });

  describe("pagination", () => {
    it("should return a URLSearchParams object with 'limit' parameter if 'limit' is provided in pagination options", () => {
      const pagination = { limit: 10 };
      const searchParameters = composeSearchParameters({ pagination });
      expect(searchParameters?.get("limit")).toBe("10");
    });

    it("should return a URLSearchParams object with 'offset' parameter if 'offset' is provided in pagination options", () => {
      const pagination = { offset: 20 };
      const searchParameters = composeSearchParameters({ pagination });
      expect(searchParameters?.get("offset")).toBe("20");
    });

    it("should return a URLSearchParams object with both 'limit' and 'offset' parameters if both are provided in pagination options", () => {
      const pagination = { limit: 10, offset: 20 };
      const searchParameters = composeSearchParameters({ pagination });
      expect(searchParameters?.get("limit")).toBe("10");
      expect(searchParameters?.get("offset")).toBe("20");
    });
  });

  describe("expand", () => {
    it("should not add 'expand' parameter if 'expand' is an empty object", () => {
      const searchParameters = composeSearchParameters({ expand: {} });
      expect(searchParameters).toBeUndefined();
    });

    it("should add 'expand' and limit parameters with correct fields if 'expand' is not empty", () => {
      const expand = {
        owner: false,
        group: true,
        demand: {},
        agent: {
          owner: true,
          account: {
            group: true,
          },
        },
      };
      const searchParameters = composeSearchParameters({ expand });
      expect(searchParameters?.toString().replaceAll("%2C", ",")).toBe(
        "limit=100&expand=group,demand,agent.owner,agent.account.group",
      );
    });

    it("should throw an error if 'expand' is nested more than 3 levels deep", () => {
      const expand = {
        level1: {
          level2: {
            level3: {
              level4: true,
            },
          },
        },
      };
      expect(() => composeSearchParameters({ expand })).toThrow(
        "Expand depth cannot be more than 3",
      );
    });
  });

  describe("order", () => {
    it("should not add 'order' parameter if 'order' is undefined", () => {
      const searchParameters = composeSearchParameters({});
      expect(searchParameters).toBeUndefined();
    });

    it("should add 'order' parameter with correct fields if 'order' is a string", () => {
      const searchParameters = composeSearchParameters({
        order: "name",
      });
      expect(searchParameters?.get("order")).toBe("name");
    });

    it("should add 'order' parameter with correct fields if 'order' is an array of strings", () => {
      const searchParameters = composeSearchParameters({
        order: ["name", "description"],
      });
      expect(searchParameters?.get("order")).toBe("name;description");
    });

    it("should add 'order' parameter with correct fields if 'order' is an array of OrderOption objects", () => {
      const searchParameters = composeSearchParameters({
        order: [
          { field: "name", direction: "asc" },
          { field: "description", direction: "desc" },
        ],
      });
      expect(searchParameters?.get("order")).toBe("name,asc;description,desc");
    });

    it("should add 'order' parameter with correct fields if 'order' is an OrderOption object", () => {
      const searchParameters = composeSearchParameters({
        order: { field: "name", direction: "asc" },
      });
      expect(searchParameters?.get("order")).toBe("name,asc");
    });

    it("should add 'order' parameter with correct fields if 'order' is an array of strings and OrderOption objects", () => {
      const searchParameters = composeSearchParameters({
        order: [
          "name",
          { field: "description", direction: "desc" },
          "externalCode",
        ],
      });
      expect(searchParameters?.get("order")).toBe(
        "name;description,desc;externalCode",
      );
    });
  });

  describe("search", () => {
    it("should not add 'search' parameter if 'search' is undefined", () => {
      const searchParameters = composeSearchParameters({});
      expect(searchParameters).toBeUndefined();
    });

    it("should add 'search' parameter with correct value if 'search' is a string", () => {
      const searchParameters = composeSearchParameters({
        search: "sample search string",
      });
      expect(searchParameters?.get("search")).toBe("sample search string");
    });
  });

  describe("filter", () => {
    it("should not add 'filter' parameter if 'filter' is undefined", () => {
      const searchParameters = composeSearchParameters({});
      expect(searchParameters).toBeUndefined();
    });

    it("should not add 'filter' parameter if filter value is undefined", () => {
      const searchParameters = composeSearchParameters({
        filter: { pathName: undefined },
      });
      expect(searchParameters).toBeUndefined();
    });

    it("should add 'filter' parameter with correct value for primitives", () => {
      const searchParameters = composeSearchParameters({
        filter: {
          name: "sample name",
          isArchived: false,
          quantity: 10,
        },
      });

      expect(searchParameters?.get("filter")).toBe(
        "name=sample name;isArchived=false;quantity=10",
      );
    });

    it("should add 'filter' parameter with correct value for arrays", () => {
      const searchParameters = composeSearchParameters({
        filter: {
          name: ["sample name 1", "sample name 2"],
          quantity: [10, 20],
        },
      });

      expect(searchParameters?.get("filter")).toBe(
        "name=sample name 1;name=sample name 2;quantity=10;quantity=20",
      );
    });

    it("should add 'filter' parameter with correct value for EqualsFilter", () => {
      const searchParameters = composeSearchParameters({
        filter: {
          name: { eq: "sample name" },
          group: { eq: ["sample group 1", "sample group 2"] },
          quantity: { eq: 10 },
          isArchived: { eq: false },
        },
      });

      expect(searchParameters?.get("filter")).toBe(
        "name=sample name;group=sample group 1;group=sample group 2;quantity=10;isArchived=false",
      );
    });

    it("should add 'filter' parameter with correct value for NotEqualsFilter", () => {
      const searchParameters = composeSearchParameters({
        filter: {
          name: { ne: "sample name" },
          group: { ne: ["sample group 1", "sample group 2"] },
          quantity: { ne: 10 },
          isArchived: { ne: false },
        },
      });

      expect(searchParameters?.get("filter")).toBe(
        "name!=sample name;group!=sample group 1;group!=sample group 2;quantity!=10;isArchived!=false",
      );
    });

    it("should add 'filter' parameter with correct value for GreaterThanFilter", () => {
      const searchParameters = composeSearchParameters({
        filter: {
          quantity: { gt: 10 },
          created: { gt: "2021-01-01" },
        },
      });

      expect(searchParameters?.get("filter")).toBe(
        "quantity>10;created>2021-01-01",
      );
    });

    it("should add 'filter' parameter with correct value for GreaterOrEqualsFilter", () => {
      const searchParameters = composeSearchParameters({
        filter: {
          quantity: { gte: 10 },
          created: { gte: "2021-01-01" },
        },
      });

      expect(searchParameters?.get("filter")).toBe(
        "quantity>=10;created>=2021-01-01",
      );
    });

    it("should add 'filter' parameter with correct value for LessThanFilter", () => {
      const searchParameters = composeSearchParameters({
        filter: {
          quantity: { lt: 10 },
          created: { lt: "2021-01-01" },
        },
      });

      expect(searchParameters?.get("filter")).toBe(
        "quantity<10;created<2021-01-01",
      );
    });

    it("should add 'filter' parameter with correct value for LessOrEqualsFilter", () => {
      const searchParameters = composeSearchParameters({
        filter: {
          quantity: { lte: 10 },
          created: { lte: "2021-01-01" },
        },
      });

      expect(searchParameters?.get("filter")).toBe(
        "quantity<=10;created<=2021-01-01",
      );
    });

    it("should add 'filter' parameter with correct value for IsNullFilter", () => {
      const searchParameters = composeSearchParameters({
        filter: {
          name: { isNull: true },
          quantity: { isNull: false },
        },
      });

      expect(searchParameters?.get("filter")).toBe("name=;quantity!=");
    });

    it("should add 'filter' parameter with correct value for IsNotNullFilter", () => {
      const searchParameters = composeSearchParameters({
        filter: {
          name: { isNotNull: true },
          quantity: { isNotNull: false },
        },
      });

      expect(searchParameters?.get("filter")).toBe("name!=;quantity=");
    });

    it("should add 'filter' parameter with correct value for LikeFilter", () => {
      const searchParameters = composeSearchParameters({
        filter: {
          name: { like: "sample name" },
        },
      });

      expect(searchParameters?.get("filter")).toBe("name~sample name");
    });

    it("should add 'filter' parameter with correct value for StartsWithFilter", () => {
      const searchParameters = composeSearchParameters({
        filter: {
          name: { sw: "sample name" },
        },
      });

      expect(searchParameters?.get("filter")).toBe("name~=sample name");
    });

    it("should add 'filter' parameter with correct value for EndsWithFilter", () => {
      const searchParameters = composeSearchParameters({
        filter: {
          name: { ew: "sample name" },
        },
      });

      expect(searchParameters?.get("filter")).toBe("name=~sample name");
    });

    it("should handle filter combinations", () => {
      const searchParameters = composeSearchParameters({
        filter: {
          name: { sw: "hello", ew: "world" },
          quantity: { gte: 10, lte: 20 },
          isArchived: { eq: false },
        },
      });

      expect(searchParameters?.get("filter")).toBe(
        "name~=hello;name=~world;quantity>=10;quantity<=20;isArchived=false",
      );
    });
  });

  describe("rest options", () => {
    it("should add rest options as URLSearchParams", () => {
      const searchParameters = composeSearchParameters({
        foo: "bar",
        bar: "baz",
        number: 1,
      } as never);

      expect(searchParameters?.get("foo")).toBe("bar");
      expect(searchParameters?.get("bar")).toBe("baz");
      expect(searchParameters?.get("number")).toBe("1");
    });
  });
});
