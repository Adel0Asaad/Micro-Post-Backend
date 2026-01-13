import {responseUnauthorized, getSession} from '@common/lib';
import {CustomRequest, TokenPayload} from '@common/types';

import {NextFunction, Response} from 'express';

// Middleware to protect APIs by verifying Bearer token
const authenticateToken = (
  req: CustomRequest<TokenPayload>,
  res: Response,
  next: NextFunction,
) => {
  const {'auth-token': authToken} = req.cookies;

  const session = getSession(authToken);

  if (!session) {
    return responseUnauthorized(res, {description: 'Unauthorized'});
  }

  req.customData = {...req.customData, ...session}; // Attach user data to request object for further use

  next();
};

export default authenticateToken;
