import {prisma} from '../prisma-config';

const getPostTranslation = async (postId: string, languageCode: string) => {
  const translation = await prisma.postTranslation.findUnique({
    where: {
      postId_languageCode: {
        postId,
        languageCode,
      },
    },
  });

  return translation; // this will be null if no translation is found -> get online translation then set translation in DB.
};

export default getPostTranslation;
