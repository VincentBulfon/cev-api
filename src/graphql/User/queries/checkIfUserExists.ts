import { arg, extendType, inputObjectType, nonNull, objectType } from 'nexus';

export const checkExistingUser = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('UserExists', {
      type: nonNull('UserExistsObject'),
      args: { passedEmail: arg({ type: nonNull('UserExistsInput') }) },
      async resolve(root, args, ctx) {
        const user = ctx.prisma.users.findUnique({
          where: { email: args.passedEmail.email },
        });
        return { exists: (await user) ? true : false };
      },
    });
  },
});

export const existingUserType = objectType({
  name: 'UserExistsObject',
  definition(t) {
    t.nonNull.boolean('exists');
  },
});

export const existingUserInput = inputObjectType({
  name: 'UserExistsInput',
  definition(t) {
    t.nonNull.string('email');
  },
});
