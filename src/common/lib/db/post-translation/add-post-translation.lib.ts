import {prisma} from '../prisma-config';

const addPostTranslation = async (
  postId: string,
  languageCode: string,
  languageName: string,
  content: string,
) => {
  // using upsert to either create a new translation or update an existing one (bad translations get updated, non-existing ones get created)
  // make sure you only call this API if the original translation has a bad score.
  const translation = await prisma.postTranslation.upsert({
    where: {
      postId_languageCode: {
        postId,
        languageCode,
      },
    },
    update: {
      content,
    },
    create: {
      postId,
      languageCode,
      languageName,
      content,
    },
  });

  return translation;
};

export default addPostTranslation;
