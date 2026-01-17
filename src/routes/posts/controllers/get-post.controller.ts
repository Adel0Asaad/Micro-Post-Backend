import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {
  responseOk,
  responseInternalError,
  getAllPosts,
  responseUnauthorized,
  responseBadRequest,
  getPostById,
} from '@common/lib';

const getPostController = async (
  req: CustomRequest<TokenPayload>,
  res: Response,
) => {
  try {
    const {id: currentUserId} = req.customData;
    const postId = req.params.postId;
    if (!postId || postId.trim() === '' || postId.length === 0) {
      return responseBadRequest(res, {description: 'Post ID is required'});
    }

    // test postId string to be matching cuid format
    const cuidRegex = /^c[a-z0-9]{8,}$/;
    if (!cuidRegex.test(postId)) {
      return responseBadRequest(res, {description: 'Invalid Post ID format'});
    }

    const post = await getPostById(postId, currentUserId);
    if (!post) {
      return responseBadRequest(res, {description: 'Post not found'});
    }

    return responseOk(res, {body: {post}});
  } catch (error) {
    // console.error('Get post error:', error);
    return responseInternalError(res);
  }
};

export default getPostController;
