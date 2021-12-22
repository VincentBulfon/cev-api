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
          throw new Error(`L'email et le mot de passe ne correspondent pas.`);
        }
        const isPasswordMatch = await compare(password, user.password);

        if (!isPasswordMatch) {
          throw new Error(`L'email et le mot de passe ne correspondent pas.`);
        }
        return {
          token: generateToken(user.id, user.role, user.first_name),
          userId: user.id,
          userRole: user.role,
          userFirstName: user.first_name,
        };
      },
    });
  },
});
