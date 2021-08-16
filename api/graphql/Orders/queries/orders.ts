import { extendType } from "nexus";

export const ordersQueries = extendType({
  type: "Query",
  definition(t) {
    t.crud.orders({
      type: "Order",
      description: "get orders",
    });
  },
});
