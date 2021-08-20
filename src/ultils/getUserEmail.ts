import { verify } from "jsonwebtoken";
import { Context } from "../context";

interface Token {
  userEmail: string;
}
export const getUserEmail = (context: Context) => {
  const authTokenWithBarer = context.request.request.headers.authorization;
  if (authTokenWithBarer) {
    const token = authTokenWithBarer.split(" ")[1];
    const user = verify(token, process.env.JWT_KEY) as Token;
    return user && user.userEmail;
  }
};
