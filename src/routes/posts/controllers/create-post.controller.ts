import {Response} from 'express';
import {CustomRequest, CreatePostBody, TokenPayload} from '@common/types';
import {
  responseOk,
  responseInternalError,
  getAllPosts,
  responseBadRequest,
  createPost,
  responseCreate,
} from '@common/lib';

const getPostsController = async (
  req: CustomRequest<TokenPayload, CreatePostBody>,
  res: Response,
) => {
  try {
    const {content} = req.body;
    const {id: userId} = req.customData;
    if (
      !content ||
      content.trim() === '' ||
      content.length === 0 ||
      // // optional: limit content length since this is a "micro" post app, fun fact,
      // // in Twitter if you try to post more than 280 chars your post will be split into multiple posts!
      // content.length > 320 ||
      typeof content !== 'string'
    )
      return responseBadRequest(res, {description: 'Content is required'});
    // or just use validation library like Zod or Yup

    const post = await createPost(userId, content);
    return responseCreate(res);
  } catch (error) {
    // console.error('Create post error:', error, post);
    return responseInternalError(res);
  }
};

export default getPostsController;
