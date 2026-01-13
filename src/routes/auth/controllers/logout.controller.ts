import {Response} from 'express';
import {responseOk} from '@common/lib';
import {CustomRequest} from '@common/types';

const logoutController = async (req: CustomRequest, res: Response) => {
  res.clearCookie('auth-token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return responseOk(res, {
    description: 'Logged out successfully',
  });
};

export default logoutController;
