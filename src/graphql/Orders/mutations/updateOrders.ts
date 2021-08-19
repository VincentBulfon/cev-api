import { extendType } from "nexus";

export const updateOrders = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.updateOneOrders({ type: "Order", description: "update one order" });
  },
});
