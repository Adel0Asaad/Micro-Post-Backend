import {prisma} from '../prisma-config';

const getFollowers = async (userId: string) => {
  const followers = await prisma.follow.findMany({
    where: {
      followingId: userId,
    },
    include: {
      follower: {
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

  return followers.map((f) => f.follower);
};

export default getFollowers;
