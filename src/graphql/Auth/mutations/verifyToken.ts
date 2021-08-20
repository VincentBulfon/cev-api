import { verify } from "jsonwebtoken";
import { arg, extendType, nonNull } from "nexus";
import { Token } from "../../../ultils/getUserEmail";

export const verifyToken = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("verifyToken", {
      type: "tokenVerificationResponse",
      args: { token: nonNull(arg({ type: "verifyTokenInput" })) },
      resolve: (root, { token: { token } }, ctx) => {
        const user = verify(token, process.env.JWT_KEY) as Token;
        if (user) {
          return { response: true, userEmail: user.userEmail };
        } else {
          return { response: false, userEmail: "" };
        }
      },
    });
  },
});
