import {Response} from 'express';
import {CustomRequest, FollowBody, TokenPayload} from '@common/types';
import {
  responseOk,
  responseInternalError,
  responseBadRequest,
  createFollow,
} from '@common/lib';

const followUserController = async (
  req: CustomRequest<TokenPayload, FollowBody>,
  res: Response,
) => {
  try {
    const {id: followerId} = req.customData;
    const {userId: followingId} = req.body;

    if (!followingId || typeof followingId !== 'string') {
      return responseBadRequest(res, {description: 'User ID is required'});
    }

    if (followerId === followingId) {
      return responseBadRequest(res, {
        description: 'You cannot follow yourself',
      });
    }

    const follow = await createFollow(followerId, followingId);
    return responseOk(res, {body: {follow}});
  } catch (error: any) {
    if (error.code === 'P2002') {
      return responseBadRequest(res, {
        description: 'You are already following this user',
      });
    }
    if (error.code === 'P2003') {
      return responseBadRequest(res, {description: 'User not found'});
    }
    return responseInternalError(res);
  }
};

export default followUserController;
