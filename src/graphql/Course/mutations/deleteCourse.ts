import { Courses } from '.prisma/client';
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
    t.field('deleteCourse', {
      type: nullable('Course'),
      args: {
        courseId: 'courseId',
      },
      async resolve(root, args, ctx) {
        let deletedCourse: Courses;
        const deletedRelation = await ctx.prisma.childrenOnCourse
          .deleteMany({
            where: { courseId: { equals: args.courseId.id } },
          })
          .then(async e => {
            deletedCourse = await ctx.prisma.courses.delete({
              where: { id: args.courseId.id },
            });
          });
        return deletedCourse || null;
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
