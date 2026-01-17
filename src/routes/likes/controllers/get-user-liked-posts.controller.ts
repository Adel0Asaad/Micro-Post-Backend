import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {
  responseOk,
  responseInternalError,
  getUserLikedPosts,
} from '@common/lib';

const getUserLikedPostsController = async (
  req: CustomRequest<TokenPayload, {}, {}, {userId: string}>,
  res: Response,
) => {
  try {
    const {userId} = req.params as {userId: string};
    const targetUserId = userId || req.customData.id;

    const posts = await getUserLikedPosts(targetUserId);
    return responseOk(res, {body: {posts, count: posts.length}});
  } catch (error) {
    return responseInternalError(res);
  }
};

export default getUserLikedPostsController;
