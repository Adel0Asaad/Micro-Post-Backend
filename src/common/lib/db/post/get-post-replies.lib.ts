import {prisma} from '../prisma-config';

const getPostReplies = async (postId: string, currentUserId?: string) => {
  const replies = await prisma.post.findMany({
    where: {
      parentId: postId,
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
    orderBy: {
      createdAt: 'desc',
    },
  });

  return replies.map((reply) => ({
    ...reply,
    likesCount: reply._count.likes,
    repliesCount: reply._count.replies,
    isLiked: currentUserId ? reply.likes.length > 0 : false,
    likes: undefined,
    _count: undefined,
  }));
};

export default getPostReplies;
