import {Response} from 'express';
import {CustomRequest} from '@common/types';
import {
  signToken,
  verifyRefreshToken,
  rotateRefreshToken,
  responseOk,
  responseBadRequest,
  responseUnauthorized,
  responseInternalError,
} from '@common/lib';
import {prisma} from '@common/lib/db/prisma-config';

const refreshController = async (req: CustomRequest, res: Response) => {
  try {
    // Get refresh token from cookie
    const {'refresh-token': refreshToken} = req.cookies;

    if (!refreshToken) {
      return responseBadRequest(res, {
        description: 'Refresh token is required',
      });
    }

    // Verify the refresh token
    const tokenData = await verifyRefreshToken(refreshToken);

    if (!tokenData) {
      // Clear the invalid refresh token cookie
      res.clearCookie('refresh-token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      return responseUnauthorized(res, {
        description: 'Invalid or expired refresh token',
      });
    }

    // Get user data for the new access token
    const user = await prisma.user.findUnique({
      where: {id: tokenData.userId},
      select: {id: true, email: true, name: true},
    });

    if (!user) {
      return responseUnauthorized(res, {
        description: 'User not found',
      });
    }

    // Rotate the refresh token (revoke old, create new)
    const newRefreshToken = await rotateRefreshToken(
      refreshToken,
      tokenData.userId,
    );

    if (!newRefreshToken) {
      return responseInternalError(res, {
        description: 'Failed to rotate refresh token',
      });
    }

    // Generate new access token
    const newAccessToken = await signToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return responseOk(
      res,
      {
        description: 'Tokens refreshed successfully',
        body: {
          user: user,
        },
      },
      {
        cookies: {
          'auth-token': {
            value: newAccessToken,
            options: {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
            },
          },
          'refresh-token': {
            value: newRefreshToken,
            options: {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            },
          },
        },
      },
    );
  } catch (error) {
    console.error('Error in refreshController:', error);
    return responseInternalError(res, {
      description: 'Internal server error',
    });
  }
};

export default refreshController;
