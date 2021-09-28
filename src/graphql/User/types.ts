import { inputObjectType, objectType } from 'nexus';

export const user = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('name');
    t.nonNull.string('first_name');
    t.nonNull.string('password');
    t.nonNull.string('phone_number');
    t.nonNull.string('email');
    t.string('secondary_email');
    t.date('vertified_at');
    t.nonNull.date('created_at');
    t.list.field('children', {
      type: 'Child',
      resolve: (root, _, ctx) => {
        return ctx.prisma.children.findMany({
          where: { tutor_id: root.id },
        });
      },
    });
  },
});

export const signupInput = inputObjectType({
  name: 'signupInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('first_name');
    t.nonNull.string('password');
    t.nonNull.string('phone_number');
    t.nonNull.string('email');
    t.nonNull.list.field('children', { type: 'ChildrenCreateInput' });
  },
});

export const UserUniqueInput = inputObjectType({
  name: 'userUniqueInput',
  definition(t) {
    t.id('id');
    t.string('email');
  },
});

export const UserUpdateInput = inputObjectType({
  name: 'userUpdateInput',
  definition(t) {
    t.string('email');
    t.string('password');
    t.string('resetPasswordToken');
  },
});
