import { extendType } from 'nexus';

//Update child mutation
export const updateChild = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.updateOneChildren({
      type: 'Child',
      description: 'update one child',
    });
  },
});
