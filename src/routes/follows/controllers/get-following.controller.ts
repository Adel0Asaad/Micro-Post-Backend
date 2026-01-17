import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {responseOk, responseInternalError, getFollowing} from '@common/lib';

const getFollowingController = async (
  req: CustomRequest<TokenPayload, {}, {}, {userId: string}>,
  res: Response,
) => {
  try {
    const {userId} = req.params as {userId: string};
    const targetUserId = userId || req.customData.id;

    const following = await getFollowing(targetUserId);
    return responseOk(res, {body: {following, count: following.length}});
  } catch (error) {
    return responseInternalError(res);
  }
};

export default getFollowingController;
