import { sign } from 'jsonwebtoken';
const generateToken = (userEmail: string) => {
  const token = sign(
    {
      userEmail,
    },
    process.env.JWT_KEY,
    {
      expiresIn: '15d',
    }
  );
  return token;
};

export default generateToken;
