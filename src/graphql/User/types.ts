import { inputObjectType, nonNull, objectType } from 'nexus';

export const user = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.nonNull.string('first_name');
    t.nonNull.string('password');
    t.nonNull.string('phone_number');
    t.nonNull.string('email');
    t.string('secondary_email');
    t.date('vertified_at');
    t.nonNull.date('created_at');
    t.list.field('children', {
      type: nonNull('Child'),
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
    t.nullable.string('secondary_email');
    t.nonNull.list.field('children', { type: 'ChildrenCreateInput' });
  },
});

export const updateUserDataInput = inputObjectType({
  name: 'updateUserInput',
  description: 'Input needed to update a user data',
  definition(t) {
    t.nonNull.field('newUserData', { type: 'newUserData' });
    t.nonNull.field('whereUserInput', { type: 'userId' });
  },
});

export const userId = inputObjectType({
  name: 'userId',
  definition(t) {
    t.string('id');
  },
});

export const newUserData = inputObjectType({
  name: 'newUserData',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('first_name');
    t.nonNull.string('password');
    t.nonNull.string('phone_number');
    t.nonNull.string('email');
    t.nullable.string('secondary_email');
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
