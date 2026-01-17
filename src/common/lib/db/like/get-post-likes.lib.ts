import {prisma} from '../prisma-config';

const getPostLikes = async (postId: string) => {
  const likes = await prisma.like.findMany({
    where: {
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
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return likes.map((l) => l.user);
};

export default getPostLikes;
