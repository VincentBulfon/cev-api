import { RoleEnum } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { Context } from '../context';

export interface Token {
  userId: string;
  userRole: RoleEnum;
}
export const getUserId = (context: Context) => {
  const authTokenWithBarer = context.request.request.headers.authorization;
  if (authTokenWithBarer) {
    const token = authTokenWithBarer.split(' ')[1];
    const user = verify(token, process.env.JWT_KEY) as Token;
    return user && user.userId && user.userRole;
  }
};
