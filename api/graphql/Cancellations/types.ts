import { objectType } from "nexus";

export const cancellation = objectType({
  name: "Cancellation",
  definition(t) {
    t.int("id");
    t.date("date");
    t.date("created_at");
    t.date("deleted_at");
  },
});
