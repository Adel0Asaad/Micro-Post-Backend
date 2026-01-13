import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {
  responseOk,
  responseInternalError,
  getUserPosts,
  getUserById,
  responseBadRequest,
} from '@common/lib';

const getUserPostsController = async (
  req: CustomRequest<TokenPayload>,
  res: Response,
) => {
  try {
    const userId = req.params.userId;

    const user = await getUserById(userId);

    console.log({user, userId});
    if (!user) {
      return responseBadRequest(res, {description: 'User not found'});
    }

    const posts = await getUserPosts(userId);
    return responseOk(res, {
      body: {
        user,
        posts: posts ?? [],
      },
    });
  } catch (error) {
    // console.error('Get user posts error:', error);
    return responseInternalError(res);
  }
};

export default getUserPostsController;
