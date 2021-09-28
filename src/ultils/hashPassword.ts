import { hash } from 'bcrypt';
const generateHashPassword = (password: string) => {
  if (password.length < 4) {
    throw new Error('Password should be greater than 4 characters');
  }
  return hash(password, 10);
};

export default generateHashPassword;
