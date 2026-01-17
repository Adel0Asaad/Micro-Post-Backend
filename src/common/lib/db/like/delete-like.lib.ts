import {prisma} from '../prisma-config';

const deleteLike = async (userId: string, postId: string) => {
  const like = await prisma.like.delete({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  return like;
};

export default deleteLike;
