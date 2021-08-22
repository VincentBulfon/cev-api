import { extendType } from "nexus";

export const pricesQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.prices({
      type: "Price",
      ordering: true,
      filtering: true,
    });
  },
});
