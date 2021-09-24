import { extendType } from "nexus";

export const createChild = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneChildren({
      type: "Child",
      description: "create one child",
    });
  },
});
