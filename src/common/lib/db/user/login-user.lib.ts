import {prisma} from '../prisma-config';
import * as bcrypt from 'bcrypt';

const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({where: {email}});
  if (!user) return null; // user not found

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) return null; // invalid password

  const {password: _, ...userWithoutPassword} = user;
  return userWithoutPassword;
};

export default loginUser;
