import { Maybe } from 'graphql/jsutils/Maybe';
import { arg, extendType, nonNull } from 'nexus';
import { getUserEmail } from '../../../ultils/getUserEmail';
import generateHashPassword from '../../../ultils/hashPassword';

export const updateUserForgotPassword = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateUser', {
      type: 'User',
      args: {
        updateUserInput: nonNull(arg({ type: 'userUpdateInput' })),
      },
      resolve: async (_, { updateUserInput: { password, email } }, ctx) => {
        const userEmail = getUserEmail(ctx);
        if (!password && !email) {
          throw new Error('No Field to update');
        }
        interface DataType {
          email?: string;
          password: string;
        }
        const data = {} as DataType;
        if (email) {
          data.email = email;
        }
        if (password) {
          data.password = await generateHashPassword(password);
        }
        const updateUser = await ctx.prisma.users.update({
          where: {
            email: userEmail,
          },
          data,
        });
        return updateUser;
      },
    });
  },
});
