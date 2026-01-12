import {prisma} from '../prisma-config';

const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {id: userId},
    omit: {password: true},
  });
  return user;
};

export default getUserById;
