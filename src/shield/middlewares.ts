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
    signup: allow,
    login: allow,
    forgotPassword: allow,
    deleteOneUsers: rules.isAuthenticatedUser,
    createOneChildren: rules.isAuthenticatedUser,
    createOneOptions_set: rules.isAuthenticatedUser,
    deleteOneCancellations: rules.isAdmin,
    createOneCancellations: rules.isAdmin,
  },
});
