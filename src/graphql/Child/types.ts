import { extendType, inputObjectType, nonNull, objectType } from 'nexus';
import generateToken from '../../ultils/tokenUtility';
import { RoleEnum } from '../enums';

export const child = objectType({
  name: 'Child',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('name');
    t.nonNull.string('first_name');
    t.nonNull.date('birth_date');
    t.nonNull.string('tutor_id');
    t.nonNull.field('tutor', {
      type: 'User',
      resolve: (root, _, ctx) => {
        return ctx.prisma.users.findUnique({
          where: { id: root.tutor_id },
        });
      },
    });
    t.list.nonNull.field('courses', {
      type: nonNull('Course'),
      resolve: (root, _, ctx) => {
        return ctx.prisma.courses.findMany({
          where: {
            ChildrenOnCourse: { some: { childrenId: { equals: root.id } } },
          },
        });
      },
    });
    t.field('currentCourse', {
      type: 'currentCourseType',
      resolve: (root, args, ctx) => {
        return ctx.prisma.childrenOnCourse.findFirst({
          select: { course: true },
          where: { childrenId: { equals: root.id } },
          orderBy: { inscriptionDate: 'desc' },
        });
      },
    });
    t.field('order', {
      type: 'Order',
      resolve: (root, args, ctx) => {
        return ctx.prisma.orders.findFirst({
          where: { child_id: root.id },
          orderBy: { created_at: 'desc' },
        });
      },
    });
    t.list.field('orders', {
      type: 'Order',
      resolve: (root, args, ctx) => {
        return ctx.prisma.orders.findMany({
          where: { id: root.id },
        });
      },
    });
    t.field('token', {
      type: 'Token',
      resolve: async (root, _, ctx) => {
        const { first_name, id, role } = await ctx.prisma.users.findUnique({
          where: { id: root.tutor_id },
          select: { first_name: true, id: true, role: true },
        });
        return {
          token: generateToken(id, role, first_name),
          userId: id,
          userRole: role,
          userFirstName: first_name,
        };
      },
    });
  },
});

export const ChildrenType = objectType({
  name: 'children',
  definition(t) {
    t.list.field('child', { type: 'Child' });
  },
});

export const token = objectType({
  name: 'Token',
  definition(t) {
    t.nonNull.string('token'),
      t.nonNull.string('userId'),
      t.nonNull.field('userRole', { type: RoleEnum });
  },
});

export const createChildrenType = objectType({
  name: 'createChildrenType',
  definition(t) {
    t.list.nonNull.field('child', {
      type: 'Child',
    });
    t.nonNull.field('token', {
      type: 'Token',
    });
  },
});

export const currentCourseType = objectType({
  name: 'currentCourseType',
  definition(t) {
    t.field('course', {
      type: 'Course',
    });
  },
});
