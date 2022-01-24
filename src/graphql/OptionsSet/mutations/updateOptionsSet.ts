import { extendType } from 'nexus';

export const updateOneOptionSet = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.updateOneOptions_set({
      type: 'OptionSet',
      description: 'update one option set',
    });
  },
});
