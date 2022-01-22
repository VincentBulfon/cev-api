import { verify } from 'jsonwebtoken';
import { extendType, nullable, objectType, stringArg } from 'nexus';

export const checkResetTokent = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('checkToken', {
      type: 'Boolean',
      args: {
        token: stringArg(),
      },
      async resolve(_root, args, ctx) {
        try {
          const res = await ctx.prisma.users.findUnique({
            where: {
              resetPasswordToken: args.token,
            },
          });
          verify(args.token, process.env.JWT_KEY);

          if (res) {
            return true;
          }
          return false;
        } catch (error) {
          return false;
        }
      },
    });
  },
});
