import {prisma} from '../prisma-config';

const checkLike = async (userId: string, postId: string) => {
  const like = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  return !!like;
};

export default checkLike;
