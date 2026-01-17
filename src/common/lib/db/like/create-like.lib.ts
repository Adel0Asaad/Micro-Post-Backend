import {prisma} from '../prisma-config';

const createLike = async (userId: string, postId: string) => {
  const like = await prisma.like.create({
    data: {
      userId,
      postId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      post: {
        select: {
          id: true,
          content: true,
          userId: true,
        },
      },
    },
  });

  return like;
};

export default createLike;
