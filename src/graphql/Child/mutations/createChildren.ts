import { Children, Prisma, RoleEnum } from '@prisma/client';

import { arg, extendType, list, nonNull } from 'nexus';
import generateHashPassword from '../../../ultils/hashPassword';
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
            let errorMessage = '';
            duplicateList.forEach(child => {
              errorMessage = `${child}, ${errorMessage}`;
            });
            throw new Error(errorMessage);
          }

          let returnedData: {
            child: Children[];
            token: {
              token: string;
              userId: string;
              userRole: RoleEnum;
              userFirstName: string;
            };
          } = {
            child: [],
            token: {
              token: '',
              userId: '',
              userRole: RoleEnum.USER,
              userFirstName: '',
            },
          };
          for await (const child of args.childrenList) {
            //Stores promise inside and array to be executed in concurrency later in code
            //promArray.push(
            const hashedPassword = await generateHashPassword(
              child.tutor.connectOrCreate.create.password
            );
            const createdChild = await ctx.prisma.children.create({
              data: {
                name: child.name,
                first_name: child.first_name,
                birth_date: new Date(child.birth_date),
                tutor: {
                  connectOrCreate: {
                    where: child.tutor.connectOrCreate.where,
                    // dcreate: child.tutor.connectOrCreate.create,
                    create: {
                      first_name: child.tutor.connectOrCreate.create.first_name,
                      name: child.tutor.connectOrCreate.create.name,
                      password: hashedPassword,
                      email: child.tutor.connectOrCreate.create.email,
                      secondary_email:
                        child.tutor.connectOrCreate.create?.secondary_email,
                      phone_number:
                        child.tutor.connectOrCreate.create.phone_number,
                    },
                  },
                },
                Orders: {
                  create: child.Orders.create,
                },
              },
            });

            const relatedCourse = await ctx.prisma.childrenOnCourse.create({
              data: {
                childrenId: createdChild.id,
                courseId:
                  child.ChildrenOnCourse.connect[0].childrenId_courseId
                    .courseId,
              },
            });
            returnedData.child.push(createdChild);
            //);
          }

          const user = await ctx.prisma.users.findUnique({
            select: { id: true, role: true, first_name: true },
            where: {
              email: args.childrenList[0].tutor.connectOrCreate.where.email,
            },
          });

          returnedData.token = {
            token: generateToken(user.id, user.role, user.first_name),
            userId: user.id,
            userRole: user.role,
            userFirstName: user.first_name,
          };

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
