import { Token } from "graphql";
import { verify } from "jsonwebtoken";
import { arg, extendType, nonNull, stringArg } from "nexus";

export const verifyToken = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("verifyToken", {
      type: "tokenVerificationResponse",
      args: { token: nonNull(arg({ type: "verifyTokenInput" })) },
      resolve: (root, { token: { token } }, ctx) => {
        const user = verify(token, process.env.JWT_KEY) as Token;
        console.log(user);
        if (user) {
          return { response: true };
        } else {
          return { response: false };
        }
      },
    });
  },
});
