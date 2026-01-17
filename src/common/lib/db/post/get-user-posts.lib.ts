import {prisma} from '../prisma-config';

const getUserPosts = async (
  userId: string,
  currentUserId?: string,
  includeReplies = false,
) => {
  const posts = await prisma.post.findMany({
    where: {
      userId,
      ...(includeReplies ? {} : {parentId: null}), // Only top-level posts by default
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
      likes: currentUserId
        ? {
            where: {
              userId: currentUserId,
            },
            select: {
              id: true,
            },
          }
        : false,
    },
    orderBy: {
      createdAt: 'desc', // newest posts first.
    },
  });

  return posts.map((post) => ({
    ...post,
    likesCount: post._count.likes,
    repliesCount: post._count.replies,
    isLiked: currentUserId ? post.likes.length > 0 : false,
    likes: undefined,
    _count: undefined,
  }));
};

export default getUserPosts;
