import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {responseOk, responseInternalError, getFollowers} from '@common/lib';

const getFollowersController = async (
  req: CustomRequest<TokenPayload, {}, {}, {userId: string}>,
  res: Response,
) => {
  try {
    const {userId} = req.params as {userId: string};
    const targetUserId = userId || req.customData.id;

    const followers = await getFollowers(targetUserId);
    return responseOk(res, {body: {followers, count: followers.length}});
  } catch (error) {
    return responseInternalError(res);
  }
};

export default getFollowersController;
