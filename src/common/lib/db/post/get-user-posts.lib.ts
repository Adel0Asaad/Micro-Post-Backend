import {prisma} from '../prisma-config';

const getUserPosts = async (userId: string) => {
  const posts = await prisma.post.findMany({
    where: {userId},
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc', // newest posts first.
    },
  });
};

export default getUserPosts;
