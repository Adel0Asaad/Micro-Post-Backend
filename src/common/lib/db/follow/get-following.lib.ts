import {prisma} from '../prisma-config';

const getFollowing = async (userId: string) => {
  const following = await prisma.follow.findMany({
    where: {
      followerId: userId,
    },
    include: {
      following: {
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

  return following.map((f) => f.following);
};

export default getFollowing;
