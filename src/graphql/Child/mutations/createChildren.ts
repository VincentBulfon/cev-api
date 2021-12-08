import { Children, Prisma } from '@prisma/client';

import { arg, extendType, list, nonNull } from 'nexus';
import generateToken from '../../../ultils/tokenUtility';

export const createChildren = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createChildren', {
      type: 'createChildrenType',
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

          let returnedData: {
            child: Children[];
            token: { token: string; userId: string };
          } = {
            child: [],
            token: { token: '', userId: '' },
          };
          for await (const child of args.childrenList) {
            //Stores promise inside and array to be executed in concurrency later in code
            //promArray.push(
            const createdChild = await ctx.prisma.children.create({
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
                courses: { connect: child.courses.connect },
                Orders: {
                  create: child.Orders.create,
                },
              },
            });
            returnedData.child.push(createdChild);
            //);
          }

          const userId = await ctx.prisma.users.findUnique({
            select: { id: true },
            where: {
              email: args.childrenList[0].tutor.connectOrCreate.where.email,
            },
          });

          returnedData.token = {
            token: generateToken(userId.id),
            userId: userId.id,
          };

          async function createToken() {
            return;
          }

          //Execute all the promises in concurrency to reduce execution time
          //returnedData = await Promise.all(promArray);
          return returnedData;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    });
  },
});
