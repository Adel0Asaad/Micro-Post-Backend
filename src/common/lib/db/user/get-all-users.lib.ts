import {prisma} from '../prisma-config';
import {omit} from 'lodash';

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    omit: {password: true, updatedAt: true},
  });

  return users;
};

export default getAllUsers;
