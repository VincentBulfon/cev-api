import { RoleEnum } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { arg, extendType, nonNull } from 'nexus';
import { Token } from '../../../ultils/getUserId';

export const verifyToken = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('verifyToken', {
      type: 'tokenVerificationResponse',
      args: { token: nonNull(arg({ type: 'verifyTokenInput' })) },
      resolve: (root, { token: { token } }, ctx) => {
        const user = verify(token, process.env.JWT_KEY) as Token;
        if (user) {
          return {
            response: true,
            userId: user.userId,
            userRole: user.userRole,
          };
        } else {
          return { response: false, userId: '', userRole: RoleEnum.USER };
        }
      },
    });
  },
});
