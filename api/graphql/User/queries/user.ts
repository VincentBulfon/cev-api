import { extendType } from "nexus";

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.crud.users({ type: "User", filtering: true, ordering: true });
  },
});
