import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {
  responseOk,
  responseInternalError,
  getFollowingPosts,
} from '@common/lib';

const getFollowingPostsController = async (
  req: CustomRequest<TokenPayload>,
  res: Response,
) => {
  try {
    const {id: currentUserId} = req.customData;

    const posts = await getFollowingPosts(currentUserId);
    return responseOk(res, {body: {posts, count: posts.length}});
  } catch (error) {
    return responseInternalError(res);
  }
};

export default getFollowingPostsController;
