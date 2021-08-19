import { extendType } from "nexus";

export const createCancellation = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneCancellations({
      type: "Cancellation",
      description: "create one cancellation",
    });
  },
});
