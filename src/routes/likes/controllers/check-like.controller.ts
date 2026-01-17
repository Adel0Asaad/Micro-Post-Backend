import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {
  responseOk,
  responseInternalError,
  responseBadRequest,
  checkLike,
} from '@common/lib';

const checkLikeController = async (
  req: CustomRequest<TokenPayload, {}, {}, {postId: string}>,
  res: Response,
) => {
  try {
    const {id: userId} = req.customData;
    const {postId} = req.params as {postId: string};

    if (!postId || typeof postId !== 'string') {
      return responseBadRequest(res, {description: 'Post ID is required'});
    }

    const isLiked = await checkLike(userId, postId);
    return responseOk(res, {body: {isLiked}});
  } catch (error) {
    return responseInternalError(res);
  }
};

export default checkLikeController;
