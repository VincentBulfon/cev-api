import { objectType } from "nexus";

export const types = objectType({
  name: "Price",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.int("price");
    t.nonNull.date("created_at");
  },
});
