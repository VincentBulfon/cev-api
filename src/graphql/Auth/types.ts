import { extendType, inputObjectType, objectType } from 'nexus';
import { getUserId } from '../../ultils/getUserId';

export const messagePayload = objectType({
  name: 'MessagePayload',
  definition(t) {
    t.nonNull.string('message');
  },
});

export const loginInput = inputObjectType({
  name: 'loginInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});

export const authPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.nonNull.string('token');
    t.nonNull.string('userId');
    t.nonNull.field('userRole', {
      type: 'RoleEnum',
    });
    t.nonNull.string('userFirstName');
  },
});

export const resetPasswordInput = inputObjectType({
  name: 'resetPasswordInput',
  definition(t) {
    t.nonNull.string('resetPasswordToken');
    t.nonNull.string('newPassword');
  },
});

export const currentUser = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('currentUser', {
      type: 'User',
      resolve: async (parent, args, ctx) => {
        const userEmail = getUserId(ctx);
        const user = await ctx.prisma.users.findUnique({
          where: { email: userEmail },
        });
        return user;
      },
    });
  },
});

export const verifyTokenInput = inputObjectType({
  name: 'verifyTokenInput',
  definition(t) {
    t.nonNull.string('token');
  },
});

export const tokenVerificationResponse = objectType({
  name: 'tokenVerificationResponse',
  definition(t) {
    t.nonNull.boolean('response');
    t.nonNull.string('userId');
    t.nonNull.string('userFirstName');
    t.nonNull.field('userRole', {
      type: 'RoleEnum',
    });
    t.nonNull.string('userFirstName');
  },
});
