import { extendType } from 'nexus';

export const updateCourse = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.updateOneCourses({
      type: 'Course',
      description: 'update one course',
    });
  },
});
