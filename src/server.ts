import { ApolloServer } from "apollo-server";
import { context } from "./context";
import graphqlSchema from "./schema";

export const server = new ApolloServer({
  introspection: true,
  context,
  schema: graphqlSchema,
});