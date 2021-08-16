import { objectType } from "nexus";

export const option = objectType({
  name: "Option",
  definition(t) {
    t.nonNull.int("id"), t.nonNull.string("name");
    t.nonNull.date("created_at");
  },
});
