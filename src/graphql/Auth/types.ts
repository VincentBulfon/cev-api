import { extendType, inputObjectType, objectType } from "nexus";
import { getUserEmail } from "../../ultils/getUserEmail";

export const messagePayload = objectType({
  name: "MessagePayload",
  definition(t) {
    t.nonNull.string("message");
  },
});

export const loginInput = inputObjectType({
  name: "loginInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("password");
  },
});

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.nonNull.string("token"), t.nonNull.string("userEmail");
  },
});

export const resetPasswordInput = inputObjectType({
  name: "resetPasswordInput",
  definition(t) {
    t.nonNull.string("resetPasswordToken");
    t.nonNull.string("newPassword");
  },
});

export const currentUser = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("currentUser", {
      type: "User",
      resolve: async (parent, args, ctx) => {
        const userEmail = getUserEmail(ctx);
        const user = await ctx.prisma.users.findUnique({
          where: { email: userEmail },
        });
        return user;
      },
    });
  },
});
