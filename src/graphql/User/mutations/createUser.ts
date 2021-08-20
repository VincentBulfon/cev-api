import { sign } from "jsonwebtoken";
import { arg, extendType, nonNull } from "nexus";
import { Context } from "../../../context";

import generateHashPassword from "../../../ultils/hashPassword";
import generateToken from "../../../ultils/tokenUtility";

export const createUser = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("signup", {
      type: "AuthPayload",
      args: {
        signupInput: arg({ type: "signupInput" }),
      },
      resolve: async (
        _,
        { signupInput: { name, first_name, email, password, phone_number } },
        ctx: Context
      ) => {
        try {
          const isUserExist = await ctx.prisma.users.findUnique({
            where: { email },
          });
          if (isUserExist) {
            throw new Error("Email is already associated with another user");
          }
          const hashPassword = await generateHashPassword(password);
          await ctx.prisma.users.create({
            data: {
              email,
              name,
              first_name,
              password: hashPassword,
              phone_number,
            },
          });
          return {
            token: generateToken(email),
            userEmail: email,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    });
  },
});

// t.nonNull.field("signup", {
//   type: "AuthPayload",
//   args: {
//     singupInput: nonNull(arg({ type: "signupInput" })),
//   },
//   resolve: async (_,{singupInput: {name,first_name,email,password,phone_number}}, ctx: Context) => {
//     try {
//       const isUserExist = await ctx.prisma.users.findUnique({where :{ email }});
//       if (isUserExist) {
//         throw new Error("Email is already associated with another user");
//       }
//       const hashPassword = await generateHashPassword(password);
//       return ({
//         token : "string",
//         userEmail : email
//       })
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   },
// }
