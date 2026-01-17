import {prisma} from '../prisma-config';

const createReply = async (
  userId: string,
  parentId: string,
  content: string,
) => {
  const reply = await prisma.post.create({
    data: {
      userId,
      parentId,
      content,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      parent: {
        select: {
          id: true,
          content: true,
          userId: true,
        },
      },
      _count: {
        select: {
          likes: true,
          replies: true,
        },
      },
    },
  });

  return {
    ...reply,
    likesCount: reply._count.likes,
    repliesCount: reply._count.replies,
  };
};

export default createReply;
