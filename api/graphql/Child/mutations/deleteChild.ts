import { extendType } from "nexus";

export const deleteChild = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.deleteOneChildren({
      type: "Child",
      description: "delete one user",
    });
  },
});
