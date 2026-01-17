import {prisma} from '../prisma-config';

const getUserById = async (userId: string, currentUserId?: string) => {
  const user = await prisma.user.findUnique({
    where: {id: userId},
    omit: {password: true},
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
      // Check if current user follows each user
      followers: currentUserId
        ? {
            where: {
              followerId: currentUserId,
            },
            select: {
              id: true,
            },
          }
        : false,
    },
  });
  return {
    ...user,
    followersCount: user._count.followers,
    followingCount: user._count.following,
    postsCount: user._count.posts,
    isFollowing: currentUserId ? user.followers.length > 0 : false,
    followers: undefined, // Remove the followers array from response
    _count: undefined, // Remove _count from response
  };
};

export default getUserById;
