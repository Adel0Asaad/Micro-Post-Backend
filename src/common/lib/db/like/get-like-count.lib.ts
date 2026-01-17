import {prisma} from '../prisma-config';

const getLikeCount = async (postId: string) => {
  const count = await prisma.like.count({
    where: {
      postId,
    },
  });

  return count;
};

export default getLikeCount;
