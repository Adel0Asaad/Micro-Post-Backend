import {prisma} from '../prisma-config';

const updateUserPost = async (
  postId: string,
  userId: string,
  content: string,
) => {
  const existingPost = await prisma.post.findUnique({
    where: {
      id: postId,
      userId,
    },
  });

  if (!existingPost) {
    return null;
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      content,
    },
  });

  return updatedPost;
};

export default updateUserPost;
