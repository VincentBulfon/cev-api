import { objectType } from 'nexus';
import generateToken from '../../ultils/tokenUtility';

export const child = objectType({
  name: 'Child',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('name');
    t.nonNull.string('first_name');
    t.nonNull.date('birth_date');
    t.nonNull.string('tutor_id');
    t.field('tutor', {
      type: 'User',
      resolve: (root, _, ctx) => {
        return ctx.prisma.users.findUnique({
          where: { id: root.tutor_id },
        });
      },
    });
    t.list.field('courses', {
      type: 'Course',
      resolve: (root, _, ctx) => {
        return ctx.prisma.courses.findMany({
          where: { children: { every: { id: { equals: root.id } } } },
        });
      },
    });
    t.list.field('orders', {
      type: 'Order',
      resolve: (root, args, ctx) => {
        return ctx.prisma.orders.findMany({
          where: { id: root.id },
        });
      },
    });
    t.field('token', {
      type: 'Token',
      resolve: async (root, _, ctx) => {
        const { name, id } = await ctx.prisma.users.findUnique({
          where: { id: root.tutor_id },
          select: { name: true, id: true },
        });
        return {
          token: generateToken(name),
          userId: id,
        };
      },
    });
  },
});

export const token = objectType({
  name: 'Token',
  definition(t) {
    t.nonNull.string('token'), t.nonNull.string('userId');
  },
});
