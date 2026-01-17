import {prisma} from '../prisma-config';

const getFollowingPosts = async (currentUserId: string) => {
  // Get posts from users that the current user follows
  const posts = await prisma.post.findMany({
    where: {
      parentId: null, // Only top-level posts
      user: {
        followers: {
          some: {
            followerId: currentUserId,
          },
        },
      },
    },
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
      parent: {
        select: {
          id: true,
          content: true,
          userId: true,
        },
      },
      // Check if current user liked each post
      likes: {
        where: {
          userId: currentUserId,
        },
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc', // latest posts first
    },
  });

  return posts.map((post) => ({
    ...post,
    likesCount: post._count.likes,
    repliesCount: post._count.replies,
    isLiked: post.likes.length > 0,
    likes: undefined,
    _count: undefined,
  }));
};

export default getFollowingPosts;
