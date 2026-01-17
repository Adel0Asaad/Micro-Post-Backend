import {Response} from 'express';
import {CustomRequest, TokenPayload, CreatePostBody} from '@common/types';
import {
  responseInternalError,
  responseBadRequest,
  responseCreate,
  createReply,
  getPostById,
} from '@common/lib';

const createReplyController = async (
  req: CustomRequest<TokenPayload, CreatePostBody>,
  res: Response,
) => {
  try {
    const {content} = req.body;
    const {id: userId} = req.customData;
    const {postId: parentId} = req.params;

    if (
      !content ||
      content.trim() === '' ||
      content.length === 0 ||
      typeof content !== 'string'
    ) {
      return responseBadRequest(res, {description: 'Content is required'});
    }

    if (!parentId || typeof parentId !== 'string') {
      return responseBadRequest(res, {
        description: 'Parent post ID is required',
      });
    }

    // Check if parent post exists
    const parentPost = await getPostById(parentId);
    if (!parentPost) {
      return responseBadRequest(res, {description: 'Parent post not found'});
    }

    const reply = await createReply(userId, parentId, content);
    return responseCreate(res, {body: {reply}});
  } catch (error) {
    return responseInternalError(res);
  }
};

export default createReplyController;
