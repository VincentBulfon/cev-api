import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
  request: {
    request: {
      headers: {
        authorization: string;
      };
    };
    connection: {
      context: {
        Authorization: string;
      };
    };
  };
}
