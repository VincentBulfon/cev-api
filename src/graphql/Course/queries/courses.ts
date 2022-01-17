import { extendType, nullable } from 'nexus';

export const coursesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.courses({
      type: 'Course',
      filtering: true,
      ordering: true,
    });
  },
});
