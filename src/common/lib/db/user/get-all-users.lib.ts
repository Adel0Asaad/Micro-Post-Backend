import {prisma} from '../prisma-config';

const getAllUsers = async (currentUserId?: string) => {
  const users = await prisma.user.findMany({
    omit: {password: true, updatedAt: true},
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

  return users.map((user) => ({
    ...user,
    followersCount: user._count.followers,
    followingCount: user._count.following,
    postsCount: user._count.posts,
    isFollowing: currentUserId ? user.followers.length > 0 : false,
    followers: undefined, // Remove the followers array from response
    _count: undefined, // Remove _count from response
  }));
};

export default getAllUsers;
