import { compare } from 'bcrypt';
import { arg, extendType } from 'nexus';
import generateToken from '../../../ultils/tokenUtility';

export const loginMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('login', {
      type: 'AuthPayload',
      args: {
        loginInput: arg({ type: 'loginInput' }),
      },
      resolve: async (_, { loginInput: { email, password } }, ctx) => {
        const user = await ctx.prisma.users.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error('User not exist');
        }
        const isPasswordMatch = await compare(password, user.password);
        if (!isPasswordMatch) {
          throw new Error(`Wrong password for ${user.email}`);
        }
        return {
          token: generateToken(user.id, user.role),
          userId: user.id,
          userRole: user.role,
        };
      },
    });
  },
});
