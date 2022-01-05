import { ApolloError } from 'apollo-server';
import { arg, extendType, nonNull } from 'nexus';
import generateHashPassword from '../../../ultils/hashPassword';

export const updateUserData = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('user', {
      type: 'User',
      args: { updateUserData: nonNull(arg({ type: 'updateUserInput' })) },
      async resolve(root, args, ctx) {
        try {
          const {
            email,
            first_name,
            name,
            password,
            secondary_email,
            phone_number,
          } = args.updateUserData.newUserData;
          const id = args.updateUserData.whereUserInput.id;
          //check if the user already exists or not
          const isUserExist = await ctx.prisma.users.findUnique({
            where: { email },
          });
          //returns an error if the user already exists
          if (isUserExist) {
            throw new ApolloError(
              'Email is already associated with another user',
              'BAD_USER_INPUT'
            );
          }

          const hashPassword = await generateHashPassword(password);

          const user = await ctx.prisma.users.update({
            where: { id: id },
            data: {
              email,
              name,
              first_name,
              password: hashPassword,
              phone_number,
              secondary_email,
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
