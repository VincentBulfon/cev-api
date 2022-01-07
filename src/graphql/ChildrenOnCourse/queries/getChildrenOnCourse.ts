import { extendType } from 'nexus';

export const ChildrenOnCourse = extendType({
  type: 'Query',
  definition(t) {
    t.crud.childrenOnCourses({
      type: 'ChildrenOnCourses',
      ordering: true,
      filtering: true,
    });
  },
});
