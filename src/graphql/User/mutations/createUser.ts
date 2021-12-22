import { ApolloError } from 'apollo-server';
import { arg, extendType } from 'nexus';
import { Context } from '../../../context';

import generateHashPassword from '../../../ultils/hashPassword';
import generateToken from '../../../ultils/tokenUtility';

export const createUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('signup', {
      type: 'AuthPayload',
      args: {
        signupInput: arg({ type: 'signupInput' }),
      },
      resolve: async (
        _,
        {
          signupInput: {
            name,
            first_name,
            email,
            password,
            phone_number,
            secondary_email,
          },
        },
        ctx: Context
      ) => {
        try {
          const isUserExist = await ctx.prisma.users.findUnique({
            where: { email },
          });
          if (isUserExist) {
            throw new ApolloError(
              'Email is already associated with another user',
              'BAD_USER_INPUT'
            );
          }

          const hashPassword = await generateHashPassword(password);

          const user = await ctx.prisma.users.create({
            data: {
              email,
              name,
              first_name,
              password: hashPassword,
              phone_number,
              secondary_email,
            },
          });

          return {
            token: generateToken(user.id, user.role, user.first_name),
            userId: user.id,
            userRole: user.role,
            userFirstName: user.first_name,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    });
  },
});
