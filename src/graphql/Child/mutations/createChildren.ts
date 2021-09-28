import { arg, extendType, list } from 'nexus';

export const createChildren = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createChildren', {
      type: list('Child'),
      args: {
        childrenList: arg({
          type: list('ChildrenCreateInput'),
        }),
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
                tutor: child.tutor,
              },
            })
            .then(res => {
              returnedData.push(res);
            });
        }
        return returnedData;
      },
    });
  },
});
