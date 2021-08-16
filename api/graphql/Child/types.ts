import { objectType } from "nexus";

export const child = objectType({
  name: "Child",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("first_name");
    t.date("birth_date");
  },
});
