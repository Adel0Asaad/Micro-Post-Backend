import {prisma} from '../prisma-config';

const deleteUserPost = async (postId: string, userId: string) => {
  const existingPost = await prisma.post.findUnique({
    where: {
      id: postId,
      userId,
    },
  });

  if (!existingPost) {
    return null;
  }

  const deletedPost = await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  return deletedPost;
};

export default deleteUserPost;
