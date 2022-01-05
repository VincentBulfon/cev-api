import { ApolloError } from 'apollo-server';
import { arg, extendType, nonNull } from 'nexus';
import generateHashPassword from '../../../ultils/hashPassword';
import { currentUser } from '../../Auth';

export const updateUserData = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateUserData', {
      type: 'User',
      args: { updateUserData: nonNull(arg({ type: 'updateUserInput' })) },
      async resolve(root, args, ctx) {
        try {
          const newData = args.updateUserData.newUserData;
          const id = args.updateUserData.whereUserInput.id;
          //check if the user already exists or not
          const isUserExist = await ctx.prisma.users.findUnique({
            where: { email: newData.email },
          });
          const currentUser = await ctx.prisma.users.findUnique({
            where: { id: id },
          });

          if (isUserExist) {
            newData.email = currentUser.email;
          }

          let hashPassword: string;

          if (newData.password == '') {
            hashPassword = currentUser.password;
          } else {
            hashPassword = await generateHashPassword(newData.password);
          }

          const user = await ctx.prisma.users.update({
            where: { id: id },
            data: {
              email: newData.email || currentUser.email,
              name: newData.name || currentUser.name,
              first_name: newData.first_name || currentUser.first_name,
              password: hashPassword,
              phone_number: newData.phone_number || currentUser.phone_number,
              secondary_email:
                newData.secondary_email || currentUser.secondary_email,
            },
          });
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    });
  },
});
