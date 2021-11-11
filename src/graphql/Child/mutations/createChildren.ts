import { Children, Prisma, PrismaClient, PrismaPromise } from '@prisma/client';
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
        const duplicateList: Array<string> = [];

        try {
          //This is a promise
          const childExists = (child: Prisma.ChildrenCreateInput) => {
            return ctx.prisma.children.count({
              where: {
                AND: { first_name: child.first_name, name: child.name },
              },
            });
          };

          let promises: any[] = [];
          for (const child of args.childrenList) {
            promises.push(childExists(child as Prisma.ChildrenCreateInput));
          }

          const existingChildren = await Promise.all(promises);
          console.log(existingChildren);

          //If count of a child is greater than 0 that means this child already exists
          existingChildren.forEach((count, index) => {
            if (count > 0) {
              const child = args.childrenList[index];
              const childName = `${child.name} ${child.first_name}`;
              duplicateList.push(childName);
            }
          });

          //Construct error message
          if (duplicateList.length > 0) {
            let errorMessage = 'already exist(s)';
            duplicateList.forEach(child => {
              errorMessage = `${child}, ${errorMessage}`;
            });
            throw new Error(errorMessage);
          }

          let returnedData: any = [];
          let promArray: any = [];
          for (const child of args.childrenList) {
            // returnedData.push(
            //   //Need to await for each promise to resolve because if the promises are executed in concurrency (Promises.all()), prisma can't handle correctly the create or connect and throw and error for unique constrain violation one "email" col.
            //   await ctx.prisma.children.create({
            //     data: {
            //       name: child.name,
            //       first_name: child.first_name,
            //       birth_date: new Date(child.birth_date),
            //       tutor: {
            //         connectOrCreate: {
            //           where: child.tutor.connectOrCreate.where,
            //           create: child.tutor.connectOrCreate.create,
            //         },
            //       },
            //     },
            //   })
            // );

            //Stores promise inside and array to be executed in concurrency later in code
            promArray.push(
              ctx.prisma.children.create({
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
            //Execute all the promises in concurrency to reduce execution time
            returnedData = await Promise.all(promArray);
          }
          return returnedData;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    });
  },
});
