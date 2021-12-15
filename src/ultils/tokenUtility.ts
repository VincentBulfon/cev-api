import { RoleEnum } from '@prisma/client';
import { sign } from 'jsonwebtoken';
const generateToken = (userId: string, userRole: RoleEnum) => {
  const token = sign(
    {
      userId,
      userRole,
    },
    process.env.JWT_KEY,
    {
      expiresIn: '15d',
    }
  );
  return token;
};

export default generateToken;
