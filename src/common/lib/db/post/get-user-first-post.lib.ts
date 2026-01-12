import {prisma} from '../prisma-config';

const getUserFirstPost = async (userId: string) => {
  const post = await prisma.post.findFirst({
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
      createdAt: 'asc', // oldest post first.
    },
  });

  return post;
};

export default getUserFirstPost;
