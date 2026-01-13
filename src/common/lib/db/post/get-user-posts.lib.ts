import {prisma} from '../prisma-config';

const getUserPosts = async (userId: string) => {
  const posts = await prisma.post.findMany({
    where: {userId},
    orderBy: {
      createdAt: 'desc', // newest posts first.
    },
  });
  return posts;
};

export default getUserPosts;
