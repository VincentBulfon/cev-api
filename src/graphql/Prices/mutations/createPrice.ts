import { extendType } from 'nexus';

export const createPrice = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOnePrices({
      type: 'Price',
      description: 'create one price',
    });
  },
});
