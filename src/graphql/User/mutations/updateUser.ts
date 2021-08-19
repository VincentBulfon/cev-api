import { extendType } from "nexus";

export const updateUser = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.updateOneUsers({
      type: "User",
      description: "update one user",
    });
  },
});
