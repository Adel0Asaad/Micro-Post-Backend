import {prisma} from '../prisma-config';

const getUserLikedPosts = async (userId: string) => {
  const likes = await prisma.like.findMany({
    where: {
      userId,
    },
    include: {
      post: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              likes: true,
              replies: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return likes.map((l) => ({
    ...l.post,
    likesCount: l.post._count.likes,
    repliesCount: l.post._count.replies,
  }));
};

export default getUserLikedPosts;
