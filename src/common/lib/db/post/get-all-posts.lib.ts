import {prisma} from '../prisma-config';

const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc', // latest posts first
    },
  });

  return posts;
};

export default getAllPosts;
