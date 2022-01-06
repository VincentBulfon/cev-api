import { extendType } from 'nexus';

export const ChildrenQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.children({
      type: 'Child',
      ordering: true,
      filtering: true,
    });
  },
});
