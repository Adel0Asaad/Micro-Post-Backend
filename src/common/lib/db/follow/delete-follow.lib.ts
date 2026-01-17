import {prisma} from '../prisma-config';

const deleteFollow = async (followerId: string, followingId: string) => {
  const follow = await prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });

  return follow;
};

export default deleteFollow;
