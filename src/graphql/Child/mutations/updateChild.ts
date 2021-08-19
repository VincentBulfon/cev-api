import { extendType } from "nexus";

export const updateChild = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.updateOneChildren({ type: "Child", description: "Update on child" });
  },
});
