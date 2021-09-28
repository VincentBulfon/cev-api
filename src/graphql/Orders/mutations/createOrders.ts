import { extendType } from 'nexus';

export const createOrder = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneOrders({
      type: 'Order',
      description: 'craete on order',
    });
  },
});
