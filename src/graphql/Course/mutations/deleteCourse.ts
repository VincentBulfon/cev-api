import { arg, extendType, inputObjectType, nullable } from 'nexus';
import { course } from '../types';

export const deleteCourse = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.deleteOneCourses({
      type: 'Course',
      description: 'delete one course',
    });
  },
});

export const deteleACourse = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('deletedCourse', {
      type: nullable('Course'),
      args: {
        courseId: 'courseId',
      },
      async resolve(root, args, ctx) {
        const deletedRelation = await ctx.prisma.childrenOnCourse.deleteMany({
          where: { courseId: { equals: args.courseId.id } },
        });
        if (deletedRelation) {
          const deletedCourse = await ctx.prisma.courses.delete({
            where: { id: args.courseId.id },
          });
        }
        return null;
      },
    });
  },
});

export const courseId = inputObjectType({
  name: 'courseId',
  definition(t) {
    t.nonNull.int('id');
  },
});
