import { sign } from 'jsonwebtoken';
const generateToken = (userId: string) => {
  const token = sign(
    {
      userId,
    },
    process.env.JWT_KEY,
    {
      expiresIn: '15d',
    }
  );
  return token;
};

export default generateToken;
