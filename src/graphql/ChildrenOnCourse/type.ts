import { objectType } from 'nexus';

export const ChildrenOnCourses = objectType({
  name: 'ChildrenOnCourses',
  definition(t) {
    t.nonNull.date('inscriptionDate');
  },
});
