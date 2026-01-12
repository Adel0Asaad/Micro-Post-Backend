import {prisma} from '../prisma-config';

const getPostById = async (postId: string) => {
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
    },
  });

  return post;
};

export default getPostById;
