import { extendType } from "nexus";

export const cancellationQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.cancellations({
      type: "Cancellation",
      filtering: true,
      ordering: true,
      description: "get cancellations",
    });
  },
});
