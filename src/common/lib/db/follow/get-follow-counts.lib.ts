import {prisma} from '../prisma-config';

const getFollowCounts = async (userId: string) => {
  const [followersCount, followingCount] = await Promise.all([
    prisma.follow.count({
      where: {
        followingId: userId,
      },
    }),
    prisma.follow.count({
      where: {
        followerId: userId,
      },
    }),
  ]);

  return {
    followersCount,
    followingCount,
  };
};

export default getFollowCounts;
