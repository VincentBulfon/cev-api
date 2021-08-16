import { extendType } from "nexus";

export const deleteCancellation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.deleteOneCancellations({
      type: "Cancellation",
      description: "delete on cancellations",
    });
  },
});
