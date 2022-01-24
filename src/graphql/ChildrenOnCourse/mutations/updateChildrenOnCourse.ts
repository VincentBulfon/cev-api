import { extendType, objectType } from 'nexus';

export const updateChildrenCourse = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.updateOneChildrenOnCourse({
      type: 'ChildrenOnCourses',
      description: 'update one children course',
    });
  },
});
