import { extendType } from 'nexus';

export const updateUserData = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.updateOneUsers({
      type: 'User',
      description: 'Update any of the user data',
    });
  },
});
