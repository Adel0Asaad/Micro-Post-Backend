import {prisma} from '../prisma-config';

const createFollow = async (followerId: string, followingId: string) => {
  // Prevent self-following
  if (followerId === followingId) {
    throw new Error('Users cannot follow themselves');
  }

  const follow = await prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
    include: {
      follower: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      following: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return follow;
};

export default createFollow;
