import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {responseOk, responseInternalError, getPostLikes} from '@common/lib';

const getPostLikesController = async (
  req: CustomRequest<TokenPayload, {}, {}, {postId: string}>,
  res: Response,
) => {
  try {
    const {postId} = req.params as {postId: string};

    const users = await getPostLikes(postId);
    return responseOk(res, {body: {users, count: users.length}});
  } catch (error) {
    return responseInternalError(res);
  }
};

export default getPostLikesController;
