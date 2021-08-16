import { objectType } from "nexus";

export const order = objectType({
  name: "Order",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.date("created_at");
    t.date("cancelled_at");
  },
});
