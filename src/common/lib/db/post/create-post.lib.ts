import {prisma} from '../prisma-config';

const createPost = async (userId: string, content: string) => {
  const post = await prisma.post.create({
    data: {
      userId,
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
    },
  });

  return post;
};

export default createPost;
