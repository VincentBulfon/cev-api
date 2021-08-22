import { allow, or, shield } from "graphql-shield";
import { rules } from "./rules";

export const middlewares = shield({
  Query: {
    users: rules.isAuthenticatedUser,
    children: rules.isAuthenticatedUser,
    courses: allow,
    cancellations: allow,
    options: allow,
    prices: allow,
    currentUser: allow,
  },
  Mutation: {
    deleteOneUsers: rules.isAuthenticatedUser,
    deleteOneCancellations: rules.isAdmin,
    createOneCancellations: rules.isAdmin,
  },
});
