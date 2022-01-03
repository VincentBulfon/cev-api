// import { Children, Orders, Prisma } from '@prisma/client';
// import {
//   arg,
//   extendType,
//   inputObjectType,
//   list,
//   nonNull,
//   objectType,
//   unionType,
// } from 'nexus';
// import { order } from '../../Orders';

// export const updateChild = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.crud.updateOneChildren({ type: 'Child', description: 'Update on child' });
//   },
// });

// export const updateChildren = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.field('updateChildren', {
//       type: 'UpdateChildrenResponse',
//       args: {
//         childrenList: arg({
//           type: nonNull(list('InputUpdateChildrenType')),
//         }),
//       },
//       async resolve(root, args, ctx) {
//         try {
//           let updatedChildren: { children: Children[] } = { children: [] };
//           let orders = [];
//           for await (const child of args.childrenList) {
//             const createdOrder = await ctx.prisma.orders.create({
//               data: {
//                 child: { connect: { id: child.id } },
//                 options_set: {
//                   createMany: {
//                     data: child.order.options_set.createMany.data,
//                     skipDuplicates: true,
//                   },
//                 },
//                 sport_voucher: child.order.sport_voucher,
//               },
//             });

//             orders.push(createdOrder);
//             const upChild = await ctx.prisma.children.update({
//               where: { id: child.id },
//               data: { courses: { connect: { id: child.course.where.id } } },
//             });
//             updatedChildren.children.push(upChild);
//           }
//           console.log(updatedChildren);
//           return updatedChildren;
//         } catch (error) {
//           throw new Error(error.message);
//         }
//       },
//     });
//   },
// });

// export const updateChildrenInputType = inputObjectType({
//   name: 'InputUpdateChildrenType',
//   definition(t) {
//     t.nonNull.field('order', {
//       type: 'OrdersCreateInput',
//     });
//     t.nonNull.field('course', {
//       type: 'CoursesCreateOrConnectWithoutCancellationsInput',
//     });
//     t.nonNull.int('id');
//   },
// });

// export const updateChildrenResponse = objectType({
//   name: 'UpdateChildrenResponse',
//   definition(t) {
//     t.nonNull.list.field('children', {
//       type: 'Child',
//     });
//   },
// });
