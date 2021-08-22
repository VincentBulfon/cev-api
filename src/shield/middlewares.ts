import { allow, or, shield } from "graphql-shield";
import { rules } from "./rules";

export const middlewares = shield({
  Query: {
    users: rules.isAuthenticatedUser,
    children: rules.isAuthenticatedUser,
  },
  Mutation: {
    deleteOneUsers: rules.isAuthenticatedUser,
    deleteOneCancellations: rules.isAdmin,
    createOneCancellations: rules.isAdmin,
  },
});
