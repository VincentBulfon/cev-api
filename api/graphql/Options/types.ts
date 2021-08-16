import { objectType } from "nexus";

export const option = objectType({
  name: "Option",
  definition(t) {
    t.int("id"), t.string("name");
    t.date("created_at");
  },
});
