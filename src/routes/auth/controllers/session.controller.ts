import {Response} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {
  responseInternalError,
  responseOk,
  responseUnauthorized,
} from '@common/lib';
import {CustomRequest} from '@common/types';

const sessionController = async (req: CustomRequest, res: Response) => {
  try {
    const {'auth-token': authToken} = req.cookies;
    if (!authToken) {
      return responseUnauthorized(res, {description: 'Not authenticated'});
    }

    try {
      const session = (await jwt.verify(
        authToken,
        process.env.JWT_SECRET,
      )) as JwtPayload;
      if (!session) {
        return responseUnauthorized(res, {description: 'Not authenticated'});
      }
      return responseOk(res, {
        body: {
          user: session,
        },
      });
    } catch (jwtError) {
      console.error('Session JWT verification error:', jwtError);
      return responseUnauthorized(res, {description: 'Not authenticated'});
    }
  } catch (error) {
    console.error('Session error:', error);
    return responseInternalError(res, {
      description: 'Internal server error',
    });
  }
};

export default sessionController;
