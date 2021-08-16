import { objectType } from "nexus";

export const types = objectType({
  name: "Price",
  definition(t) {
    t.int("id");
    t.int("price");
    t.date("created_at");
  },
});
