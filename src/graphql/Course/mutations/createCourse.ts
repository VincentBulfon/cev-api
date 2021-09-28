import { extendType } from 'nexus';

export const createCourse = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCourses({
      type: 'Course',
      description: 'create on course',
    });
  },
});
