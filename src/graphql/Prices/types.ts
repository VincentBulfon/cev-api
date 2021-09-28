import { objectType } from 'nexus';

export const types = objectType({
  name: 'Price',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.int('price');
    t.nonNull.date('created_at');
    t.nonNull.int('option_id');
    t.nonNull.field('option', {
      type: 'Option',
      resolve: (root, args, ctx) => {
        return ctx.prisma.options.findUnique({ where: { id: root.option_id } });
      },
    });
  },
});
