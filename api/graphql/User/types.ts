import { objectType } from "nexus";

export const user = objectType({
  name: "User",
  definition(t) {
    t.int("id");
    t.string("email");
    t.string("name");
    t.string("first_name");
    t.string("password");
    t.string("phone_number");
    t.string("secondary_email");
    t.date("created_at");
    t.date("vertified_at");
    t.date("created_at");
  },
});
