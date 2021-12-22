import { RoleEnum } from '@prisma/client';
import { sign } from 'jsonwebtoken';
const generateToken = (
  userId: string,
  userRole: RoleEnum,
  userFirstName: string
) => {
  const token = sign(
    {
      userId,
      userRole,
      userFirstName,
    },
    process.env.JWT_KEY,
    {
      expiresIn: '15d',
    }
  );
  return token;
};

export default generateToken;
