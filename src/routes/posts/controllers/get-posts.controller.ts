import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {responseOk, responseInternalError, getAllPosts} from '@common/lib';

const getPostsController = async (
  req: CustomRequest<TokenPayload>,
  res: Response,
) => {
  try {
    const posts = await getAllPosts();
    return responseOk(res, {body: {posts}});
  } catch (error) {
    // console.error('Get posts error:', error);
    return responseInternalError(res);
  }
};

export default getPostsController;
