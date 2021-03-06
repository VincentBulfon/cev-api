import { Options_set } from '.prisma/client';
import { StatusEnum } from '@prisma/client';
import { arg, extendType, inputObjectType, list, nonNull } from 'nexus';
import mailService from '../../../ultils/sendEmail';

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
        UpdateOptionSet: arg({ type: nonNull(list('UpdateOptionSetInput')) }),
      },

      async resolve(root, args, ctx) {
        const user = await ctx.prisma.users.findFirst({
          select: { email: true },
          where: {
            children: {
              some: {
                id: {
                  equals: args.UpdateOptionSet[0].childId,
                },
              },
            },
          },
        });
        const updatedOptionSet: Options_set[] = [];
        let set: {
          option_set_id: number;
          option_set_status: StatusEnum;
        } = null;
        for await (set of args.UpdateOptionSet) {
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
        }
        console.log(user.email);

        const html = mailService.paymentUpdated();
        mailService.sendEmail(
          process.env.EMAIL_FROM,
          user.email,
          'CEV : paiement cotisation',
          html
        );

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
    t.nonNull.int('childId');
  },
});
