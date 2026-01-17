import {prisma} from '../prisma-config';

const getPostById = async (postId: string, currentUserId?: string) => {
  const post = await prisma.post.findUnique({
    where: {id: postId},
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
      // Check if current user liked this post
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
      replies: {
        take: 5, // Limit initial replies
        orderBy: {
          createdAt: 'desc',
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
          // Check if current user liked each reply
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
      },
    },
  });

  if (!post) return null;

  return {
    ...post,
    likesCount: post._count.likes,
    repliesCount: post._count.replies,
    isLiked: currentUserId ? post.likes.length > 0 : false,
    likes: undefined,
    _count: undefined,
    replies: post.replies.map((reply) => ({
      ...reply,
      likesCount: reply._count.likes,
      repliesCount: reply._count.replies,
      isLiked: currentUserId ? reply.likes.length > 0 : false,
      likes: undefined,
      _count: undefined,
    })),
  };
};

export default getPostById;
