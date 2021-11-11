import { ApolloServer } from 'apollo-server';

import { prisma } from './db';
import graphqlSchema from './schema';

export const server = new ApolloServer({
  introspection: true,
  context: req => {
    return {
      request: req,
      prisma,
    };
  },
  schema: graphqlSchema,
});
