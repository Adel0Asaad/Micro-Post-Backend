import {Response} from 'express';
import {responseOk, revokeRefreshToken} from '@common/lib';
import {CustomRequest} from '@common/types';

const logoutController = async (req: CustomRequest, res: Response) => {
  // Get refresh token from cookie and revoke it
  const {'refresh-token': refreshToken} = req.cookies;
  if (refreshToken) {
    await revokeRefreshToken(refreshToken);
  }

  // Clear the access token cookie
  res.clearCookie('auth-token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  // Clear the refresh token cookie
  res.clearCookie('refresh-token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return responseOk(res, {
    description: 'Logged out successfully',
  });
};

export default logoutController;
