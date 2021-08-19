import { arg, objectType } from "nexus";

export const course = objectType({
  name: "Course",
  definition(t) {
    t.nonNull.int("id"), t.int("day_of_week");
    t.nonNull.date("start_time");
    t.nonNull.date("end_time");
    t.nonNull.int("places");
    t.list.field("enfants", {
      type: "Child",
      resolve: (root, args, ctx) => {
        return ctx.prisma.children.findMany({
          where: { courses: { some: { id: { equals: root.id } } } },
        });
      },
    });
    t.list.field("cancellations", {
      type: "Cancellation",
      args: {
        firstDate: arg({ type: "DateTime" }),
        secondDate: arg({ type: "DateTime" }),
      },
      resolve: (root, args, ctx) => {
        return ctx.prisma.cancellations.findMany({
          where: {
            AND: {
              course_id: root.id,
              date: {
                gte: new Date(args.firstDate),
                lt: new Date(args.secondDate),
              },
            },
          },
        });
      },
    });
  },
});