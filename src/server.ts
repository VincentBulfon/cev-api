import { ApolloServer } from "apollo-server";
import { applyMiddleware } from "graphql-middleware";
import { prisma } from "./db";
import graphqlSchema from "./schema";
import { middlewares } from "./shield/middlewares";

export const server = new ApolloServer({
  introspection: true,
  context: (req) => {
    return {
      request: req,
      prisma,
    };
  },
  schema: applyMiddleware(graphqlSchema, middlewares),
});
