import { extendType } from 'nexus';

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.users({ type: 'User', filtering: true, ordering: true });
  },
});
