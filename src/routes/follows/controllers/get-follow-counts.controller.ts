import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {responseOk, responseInternalError, getFollowCounts} from '@common/lib';

const getFollowCountsController = async (
  req: CustomRequest<TokenPayload, {}, {}, {userId: string}>,
  res: Response,
) => {
  try {
    const {userId} = req.params as {userId: string};
    const targetUserId = userId || req.customData.id;

    const counts = await getFollowCounts(targetUserId);
    return responseOk(res, {body: counts});
  } catch (error) {
    return responseInternalError(res);
  }
};

export default getFollowCountsController;
