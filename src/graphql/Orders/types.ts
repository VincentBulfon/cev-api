import { objectType } from 'nexus';

export const order = objectType({
  name: 'Order',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.date('created_at');
    t.date('cancelled_at');
    t.nonNull.int('child_id');
    t.nonNull.boolean('sport_voucher');
    t.list.nonNull.field('option_set', {
      type: 'OptionSet',
      resolve: (root, _, ctx) => {
        return ctx.prisma.options_set.findMany({
          where: { order_id: { equals: root.id } },
        });
      },
    });
    t.nonNull.field('child', {
      type: 'Child',
      resolve: (root, _, ctx) => {
        return ctx.prisma.children.findFirst({
          where: { id: { equals: root.child_id } },
        });
      },
    });
  },
});
