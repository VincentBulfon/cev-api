import { extendType } from "nexus";

export const updateCancellation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.updateOneCancellations({
      type: "Cancellation",
      description: "update on cancellation",
    });
  },
});
