import { arg, list, nonNull, objectType } from 'nexus';

export const course = objectType({
  name: 'Course',
  definition(t) {
    t.nonNull.int('id'), t.nonNull.int('day_of_week');
    t.nonNull.date('start_time');
    t.nonNull.date('end_time');
    t.nonNull.int('places');
    t.nonNull.int('occupation', {
      async resolve(root, _args, ctx) {
        const occupation = await ctx.prisma.children.count({
          where: { ChildrenOnCourse: { some: { courseId: root.id } } },
        });
        return occupation;
      },
    });
    t.list.field('children', {
      type: nonNull('Child'),
      resolve: (root, _args, ctx) => {
        return ctx.prisma.children.findMany({
          where: {
            ChildrenOnCourse: { some: { courseId: root.id } },
          },
        });
      },
    });
    t.list.field('cancellations', {
      type: 'Cancellation',
      args: {
        firstDate: arg({ type: 'DateTime' }),
        secondDate: arg({ type: 'DateTime' }),
      },
      resolve: (root, args, ctx) => {
        return ctx.prisma.cancellations.findMany({
          where: {
            AND: {
              course_id: root.id,
              date: {
                gte: new Date(args.firstDate),
                lt: new Date(args.secondDate),
              },
            },
          },
        });
      },
    });
  },
});
