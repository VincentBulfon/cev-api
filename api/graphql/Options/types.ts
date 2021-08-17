import { objectType } from "nexus";
import { resolve } from "path/posix";

export const option = objectType({
  name: "Option",
  definition(t) {
    t.nonNull.int("id"), t.nonNull.string("name");
    t.nonNull.date("created_at");
    t.field("price", {
      type: "Price",
      resolve: (root, _, ctx) => {
        return ctx.prisma.prices.findFirst({
          orderBy: { created_at: "asc" },
          take: 1,
        });
      },
    });
  },
});
