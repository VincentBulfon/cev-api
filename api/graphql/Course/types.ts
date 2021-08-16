import { objectType } from "nexus";

export const course = objectType({
  name: "Course",
  definition(t) {
    t.int("id"), t.int("day_of_week");
    t.date("start_time");
    t.date("end_time");
    t.int("places");
  },
});
