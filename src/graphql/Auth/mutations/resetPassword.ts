import { verify } from 'jsonwebtoken';
import { arg, extendType, nonNull } from 'nexus';
import generateHashPassword from '../../../ultils/hashPassword';

export const resetPAssword = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('resetPassword', {
      type: 'MessagePayload',
      args: {
        resetPasswordInput: nonNull(
          arg({
            type: 'resetPasswordInput',
          })
        ),
      },
      resolve: async (
        _,
        { resetPasswordInput: { resetPasswordToken, newPassword } },
        ctx
      ) => {
        try {
          if (!resetPasswordToken) {
            throw new Error('No reset link found');
          }
          verify(resetPasswordToken, process.env.JWT_RESET_PASSWORD);
          const user = await ctx.prisma.users.findUnique({
            where: {
              resetPasswordToken,
            },
          });
          if (!user) {
            throw new Error('User not exist');
          }
          const password = await generateHashPassword(newPassword);
          await ctx.prisma.users.update({
            where: {
              id: user.id,
            },
            data: {
              password,
              resetPasswordToken: '',
            },
          });
          return {
            message: `Super! Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.`,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    });
  },
});
