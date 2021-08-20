import { sign } from "jsonwebtoken";
import { arg, extendType, nonNull, stringArg } from "nexus";
import { Context } from "../../../context";
import mailService from "../../../ultils/sendEmail";

export const forgotPassword = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("forgotPassword", {
      type: "MessagePayload",

      args: {
        email: nonNull(stringArg()),
      },
      resolve: async (_, { email }, ctx: Context) => {
        try {
          const user = await ctx.prisma.users.findUnique({
            where: { email },
          });
          if (!user) {
            throw new Error("User not exist");
          }
          const token = sign(
            {
              email: email,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "10m",
            }
          );
          const html = mailService.resetPassword(token);
          await ctx.prisma.users.update({
            where: {
              email,
            },
            data: {
              resetPasswordToken: token,
            },
          });
          await mailService.sendEmail(
            process.env.EMAIL_FROM,
            email,
            "Password Reset",
            html
          );
          return {
            message: `Un email à été envoyé à ${email}. Suivez les instruction pour réinitialiser votre mot de passe`,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    });
  },
});
