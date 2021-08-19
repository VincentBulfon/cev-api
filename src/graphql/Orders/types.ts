import { objectType } from "nexus";

export const order = objectType({
  name: "Order",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.date("created_at");
    t.date("cancelled_at");
    t.nonNull.int("user_id");
    t.list.field("option_set", {
      type: "OptionSet",
      resolve: (root, _, ctx) => {
        return ctx.prisma.options_set.findMany({
          where: { order_id: { equals: root.id } },
        });
      },
    });
    t.field("user", {
      type: "User",
      resolve: (root, _, ctx) => {
        return ctx.prisma.users.findFirst({
          where: { id: { equals: root.user_id } },
        });
      },
    });
  },
});
