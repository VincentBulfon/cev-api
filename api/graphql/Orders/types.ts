import { objectType } from "nexus";

export const order = objectType({
  name: "Order",
  definition(t) {
    t.int("id");
    t.date("created_at");
    t.date("cancelled_at");
  },
});
