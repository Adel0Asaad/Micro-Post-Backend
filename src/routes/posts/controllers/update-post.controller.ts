import {Response} from 'express';
import {CustomRequest, CreatePostBody, TokenPayload} from '@common/types';
import {
  responseOk,
  responseInternalError,
  responseBadRequest,
  updateUserPost,
} from '@common/lib';

const updatePostController = async (
  req: CustomRequest<TokenPayload, CreatePostBody>,
  res: Response,
) => {
  try {
    const {content} = req.body;
    const {id: userId} = req.customData;

    const postId = req.params.postId;
    if (!postId || postId.trim() === '' || postId.length === 0) {
      return responseBadRequest(res, {description: 'Post ID is required'});
    }

    // test postId string to be matching cuid format
    const cuidRegex = /^c[a-z0-9]{8,}$/;
    if (!cuidRegex.test(postId)) {
      return responseBadRequest(res, {description: 'Invalid Post ID format'});
    }

    if (
      !content ||
      content.trim() === '' ||
      content.length === 0 ||
      typeof content !== 'string'
    ) {
      return responseBadRequest(res, {description: 'Content is required'});
    }

    const post = await updateUserPost(postId, userId, content);
    if (!post) {
      return responseBadRequest(res, {
        description: 'Post not found or you are not the author',
      });
    }

    return responseOk(res, {body: {post}});
  } catch (error) {
    // console.error('Update post error:', error);
    return responseInternalError(res);
  }
};

export default updatePostController;
