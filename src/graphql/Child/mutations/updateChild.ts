import { Children, Prisma } from '@prisma/client';
import {
  arg,
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType,
} from 'nexus';

export const updateChild = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.updateOneChildren({ type: 'Child', description: 'Update on child' });
  },
});

export const updateChildren = extendType({
  type: 'Mutation',
  definition(t) {
    t.list.field('updateChildren', {
      type: 'updatedChildrenType',
      args: {
        childrenList: arg({
          type: nonNull(list('InputUpdateChildrenType')),
        }),
      },
      async resolve(root, args, ctx) {
        let updatedChildren = [];
        for await (const child of args.childrenList) {
          const updatedChild = await ctx.prisma.children.update({
            data: {
              courses: { connect: child.course.where },
              Orders: { create: child.order.create },
            },
            where: { id: child.id },
          });
          updatedChildren.push(updatedChild);
        }
        console.log(updatedChildren);

        return updatedChildren;
      },
    });
  },
});

export const updateChildrenInputType = inputObjectType({
  name: 'InputUpdateChildrenType',
  definition(t) {
    t.nonNull.field('order', {
      type: 'ChildrenCreateOrConnectWithoutCoursesInput',
    });
    t.nonNull.field('course', {
      type: 'ChildrenCreateOrConnectWithoutOrdersInput',
    });
    t.nonNull.int('id');
  },
});

export const updatedChildren = objectType({
  name: 'updatedChildrenType',
  definition(t) {
    t.list.nonNull.field('children', {
      type: 'Child',
    });
  },
});
