import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {
  responseOk,
  responseInternalError,
  responseBadRequest,
  deleteFollow,
} from '@common/lib';

const unfollowUserController = async (
  req: CustomRequest<TokenPayload, {}, {}, {userId: string}>,
  res: Response,
) => {
  try {
    const {id: followerId} = req.customData;
    const {userId: followingId} = req.params as {userId: string};

    if (!followingId || typeof followingId !== 'string') {
      return responseBadRequest(res, {description: 'User ID is required'});
    }

    await deleteFollow(followerId, followingId);
    return responseOk(res, {body: {message: 'Unfollowed successfully'}});
  } catch (error: any) {
    if (error.code === 'P2025') {
      return responseBadRequest(res, {
        description: 'You are not following this user',
      });
    }
    return responseInternalError(res);
  }
};

export default unfollowUserController;
