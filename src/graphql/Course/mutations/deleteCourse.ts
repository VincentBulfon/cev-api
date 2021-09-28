import { extendType } from 'nexus';

export const deleteCourse = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.deleteOneCourses({
      type: 'Course',
      description: 'delete one course',
    });
  },
});
