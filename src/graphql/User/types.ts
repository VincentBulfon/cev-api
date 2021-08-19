import { nonNull, objectType } from "nexus";

export const user = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("first_name");
    t.nonNull.string("password");
    t.nonNull.string("phone_number");
    t.string("secondary_email");
    t.date("vertified_at");
    t.nonNull.date("created_at");
    t.list.field("children", {
      type: "Child",
      resolve: (root, _, ctx) => {
        return ctx.prisma.children.findMany({
          where: { tutor_id: root.id },
        });
      },
    });
    t.list.field("Orders", {
      type: "Order",
      resolve: (root, args, ctx) => {
        return ctx.prisma.orders.findMany({
          where: { user_id: root.id },
        });
      },
    });
  },
});
