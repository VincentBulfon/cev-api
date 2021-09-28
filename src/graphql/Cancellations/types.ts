import { objectType } from 'nexus';

export const cancellation = objectType({
  name: 'Cancellation',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.date('date');
    t.nonNull.date('created_at');
    t.date('deleted_at');
  },
});
