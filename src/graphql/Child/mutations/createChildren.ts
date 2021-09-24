import { prisma } from "@prisma/client";
import { arg, booleanArg, extendType, intArg, list, stringArg } from "nexus";
import { Children } from "@prisma/client";

type CreateChildrenTypes = [{}];

export const createChildren = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createChildren", {
      type: list("Child"),
      args: {
        childrenList: arg({
          type: list("ChildrenCreateInput"),
        }),
        parentMail: stringArg(),
        // courseId: intArg(),
        // voucher: booleanArg(),
      },
      async resolve(root, args, ctx) {
        let returnedData: any = [];
        for (const child of args.childrenList) {
          await ctx.prisma.children
            .create({
              data: {
                name: child.name,
                first_name: child.first_name,
                birth_date: new Date(child.birth_date),
                tutor: { connect: { email: args.parentMail } },
                // courses: {
                //   connect: { id: args.courseId },
                // },
                // Orders: {
                //   create: {
                //     sport_voucher: args.voucher,
                //   },
                // },
              },
            })
            .then((res) => {
              returnedData.push(res);
            });
        }
        return returnedData;
      },
    });
  },
});
