import { objectType } from "nexus";

export const option_set = objectType({
  name: "OptionSet",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.field("status", {
      type: "StatusEnum",
    });
    t.date("paid_at");
    t.date("cancelled_at");
    t.nonNull.int("option_id");
    t.nonNull.int("price_id");
    t.nonNull.int("order_id");
    t.field("options", {
      type: "Option",
      resolve: (root, _, ctx) => {
        return ctx.prisma.options.findUnique({
          where: { id: root.option_id },
        });
      },
    });
    t.field("price", {
      type: "Price",
      resolve: (root, _, ctx) => {
        return ctx.prisma.prices.findFirst({
          where: { id: { equals: root.price_id } },
        });
      },
    });
  },
});
