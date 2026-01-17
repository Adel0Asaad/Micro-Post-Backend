import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {
  responseOk,
  responseInternalError,
  responseBadRequest,
  deleteLike,
} from '@common/lib';

const unlikePostController = async (
  req: CustomRequest<TokenPayload, {}, {}, {postId: string}>,
  res: Response,
) => {
  try {
    const {id: userId} = req.customData;
    const {postId} = req.params as {postId: string};

    if (!postId || typeof postId !== 'string') {
      return responseBadRequest(res, {description: 'Post ID is required'});
    }

    await deleteLike(userId, postId);
    return responseOk(res, {body: {message: 'Unliked successfully'}});
  } catch (error: any) {
    if (error.code === 'P2025') {
      return responseBadRequest(res, {
        description: 'You have not liked this post',
      });
    }
    return responseInternalError(res);
  }
};

export default unlikePostController;
