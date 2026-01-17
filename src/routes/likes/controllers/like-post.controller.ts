import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {
  responseInternalError,
  responseBadRequest,
  responseCreate,
  createLike,
} from '@common/lib';

interface LikeBody {
  postId: string;
}

const likePostController = async (
  req: CustomRequest<TokenPayload, LikeBody>,
  res: Response,
) => {
  try {
    const {id: userId} = req.customData;
    const {postId} = req.body;

    if (!postId || typeof postId !== 'string') {
      return responseBadRequest(res, {description: 'Post ID is required'});
    }

    const like = await createLike(userId, postId);
    return responseCreate(res, {body: {like}});
  } catch (error: any) {
    if (error.code === 'P2002') {
      return responseBadRequest(res, {
        description: 'You have already liked this post',
      });
    }
    if (error.code === 'P2003') {
      return responseBadRequest(res, {description: 'Post not found'});
    }
    return responseInternalError(res);
  }
};

export default likePostController;
