import {Response} from 'express';
import {CustomRequest, TokenPayload} from '@common/types';
import {responseOk, responseInternalError, getAllUsers} from '@common/lib';

const getUsersController = async (
  req: CustomRequest<TokenPayload>,
  res: Response,
) => {
  try {
    const {id: currentUserId} = req.customData;
    const users = await getAllUsers(currentUserId);
    return responseOk(res, {body: {users}});
  } catch (error) {
    // console.error('Get posts error:', error);
    return responseInternalError(res);
  }
};

export default getUsersController;
