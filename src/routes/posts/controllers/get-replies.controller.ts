import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {responseOk, responseInternalError, getPostReplies} from '@common/lib';

const getRepliesController = async (
  req: CustomRequest<TokenPayload>,
  res: Response,
) => {
  try {
    const {id: currentUserId} = req.customData;
    const {postId} = req.params;

    const replies = await getPostReplies(postId, currentUserId);
    return responseOk(res, {body: {replies, count: replies.length}});
  } catch (error) {
    return responseInternalError(res);
  }
};

export default getRepliesController;
