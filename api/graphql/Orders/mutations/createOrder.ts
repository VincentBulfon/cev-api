import { extendType } from "nexus";

export const creatOrder = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneOrders({
      type: "Order",
      description: "create one order",
    });
  },
});
