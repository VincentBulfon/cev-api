import { extendType } from "nexus";

export const createUser = extendType({
  type: "Mutation",
  definition(t) {
    t.crud.createOneUsers({ type: "User", description: "create on user" });
  },
});
