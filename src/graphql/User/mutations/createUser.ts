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
            children,
          },
        },
        ctx: Context,
      ) => {
        try {
          const isUserExist = await ctx.prisma.users.findUnique({
            where: { email },
          });
          if (isUserExist) {
            throw new ApolloError(
              'Email is already associated with another user',
              'BAD_USER_INPUT',
            );
          }

          const hashPassword = await generateHashPassword(password);

          const user = await ctx.prisma.users
            .create({
              data: {
                email,
                name,
                first_name,
                password: hashPassword,
                phone_number,
              },
            })
            .then(async user => {
              let returnedChildren = [];
              children.map(async child => {
                await ctx.prisma.children
                  .create({
                    data: {
                      name: child.name,
                      first_name: child.first_name,
                      birth_date: new Date(child.birth_date),
                      tutor: { connect: { email: user.email } },
                    },
                  })
                  .then(res => {
                    returnedChildren.push(res);
                  });
              });
              console.log(children);
            });

          return {
            token: generateToken(email),
            userEmail: email,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    });
  },
});
