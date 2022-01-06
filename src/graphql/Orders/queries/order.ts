import { extendType } from 'nexus';

export const get_order = extendType({
  type: 'Query',
  definition(t) {
    t.crud.orders({
      type: 'Order',
      description: 'get one order',
    });
  },
});
