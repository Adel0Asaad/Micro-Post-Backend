import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {responseOk, responseInternalError, getAllPosts} from '@common/lib';

const getPostsController = async (
  req: CustomRequest<TokenPayload>,
  res: Response,
) => {
  try {
    const {id: currentUserId} = req.customData;
    const posts = await getAllPosts(currentUserId);
    return responseOk(res, {body: {posts}});
  } catch (error) {
    // console.error('Get posts error:', error);
    return responseInternalError(res);
  }
};

export default getPostsController;
