import { Prisma, PrismaClient } from '@prisma/client';
import { ApolloError, UserInputError } from 'apollo-server';
import { arg, extendType, list, nonNull } from 'nexus';
import { NexusGenInputs } from '../../../../nexus-typegen';

export const createChildren = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createChildren', {
      type: list('Child'),
      args: {
        childrenList: arg({
          type: nonNull(list('ChildrenCreateInput')),
        }),
      },
      async resolve(root, args, ctx) {
        try {
          //This is a promise
          const childExists = (child: Prisma.ChildrenCreateInput) => {
            return ctx.prisma.children.count({
              where: {
                AND: { first_name: child.first_name, name: child.name },
              },
            });
          };

          let promises = [];
          // for (const child of args.childrenList) {
          //   promises.push(childExists(child as Prisma.ChildrenCreateInput));
          // }

          // console.log(await Promise.all(promises));

          // for (const child of args.childrenList) {
          //   console.log(await childExists(child as Prisma.ChildrenCreateInput));
          // }

          let returnedData: any = [];
          for (const child of args.childrenList) {
            returnedData.push(
              await ctx.prisma.children.create({
                data: {
                  name: child.name,
                  first_name: child.first_name,
                  birth_date: new Date(child.birth_date),
                  tutor: {
                    connectOrCreate: {
                      where: child.tutor.connectOrCreate.where,
                      create: child.tutor.connectOrCreate.create,
                    },
                  },
                },
              })
            );
          }
          return returnedData;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    });
  },
});
