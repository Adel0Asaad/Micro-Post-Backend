import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {
  responseOk,
  responseInternalError,
  responseBadRequest,
  checkFollow,
} from '@common/lib';

const checkFollowController = async (
  req: CustomRequest<TokenPayload, {}, {}, {userId: string}>,
  res: Response,
) => {
  try {
    const {id: followerId} = req.customData;
    const {userId: followingId} = req.params as {userId: string};

    if (!followingId || typeof followingId !== 'string') {
      return responseBadRequest(res, {description: 'User ID is required'});
    }

    const isFollowing = await checkFollow(followerId, followingId);
    return responseOk(res, {body: {isFollowing}});
  } catch (error) {
    return responseInternalError(res);
  }
};

export default checkFollowController;
