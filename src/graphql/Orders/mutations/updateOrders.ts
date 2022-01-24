import { Options_set } from '.prisma/client';
import { StatusEnum } from '@prisma/client';
import { arg, extendType, inputObjectType, list, nonNull } from 'nexus';

export const updateOrders = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.updateOneOrders({ type: 'Order', description: 'update one order' });
  },
});

export const updateOneOrder = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('updateOptionSet', {
      type: list('OptionSet'),
      args: {
        UpdateOptionSet: nonNull(list('UpdateOptionSetInput')),
      },
      async resolve(root, args, ctx) {
        const updatedOptionSet: Options_set[] = [];
        
        args.UpdateOptionSet.map(async set => {
          const option_set = ctx.prisma.options_set.update({
            where: { id: set.option_set_id },
            data: {
              status: { set: set.option_set_status },
              paid_at: {
                set: set.option_set_status ? new Date(Date.now()) : null,
              },
            },
          });
          updatedOptionSet.push(await option_set);
          console.log(updatedOptionSet);
        });

        return updatedOptionSet;
      },
    });
  },
});

export const updateOrderInput = inputObjectType({
  name: 'UpdateOptionSetInput',
  definition(t) {
    t.nonNull.int('option_set_id');
    t.nonNull.field('option_set_status', {
      type: 'StatusEnum',
    });
  },
});
