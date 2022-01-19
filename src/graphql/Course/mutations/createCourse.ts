import { arg, extendType, nonNull, nullable } from 'nexus';

export const createCourse = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCourses({
      type: 'Course',
      description: 'create on course',
    });
  },
});

export const createCourseWithoutDuplication = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUniqueCourse', {
      type: nullable('Course'),
      args: {
        course: arg({
          type: nonNull('CoursesCreateInput'),
        }),
      },
      async resolve(root, args, ctx) {
        const courseExists = ctx.prisma.courses.findFirst({
          where: {
            OR: [
              {
                day_of_week: { equals: args.course.day_of_week },
                AND: [
                  {
                    start_time: { equals: args.course.start_time },
                    end_time: { equals: args.course.end_time },
                  },
                ],
              },
              {
                day_of_week: { equals: args.course.day_of_week },
                OR: [
                  {
                    start_time: {
                      gt: args.course.start_time,
                      lt: args.course.end_time,
                    },
                  },
                  {
                    end_time: {
                      gt: args.course.start_time,
                      lt: args.course.end_time,
                    },
                  },
                ],
              },
            ],
          },
        });
        if (await courseExists) {
          throw new Error('Course already exists for these hours');
        }
        const course = ctx.prisma.courses.create({
          data: {
            day_of_week: args.course.day_of_week,
            start_time: args.course.start_time,
            end_time: args.course.end_time,
            places: args.course.places,
          },
        });
        return await course;
      },
    });
  },
});
