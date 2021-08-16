import { extendType } from "nexus";

export const deleteUser = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.deleteOneUsers({ type: "User", description: "delete on user" });
  },
});
