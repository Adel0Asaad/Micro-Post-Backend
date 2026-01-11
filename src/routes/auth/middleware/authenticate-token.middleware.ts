import {
  BytesCustomData,
  CreateByteManipulationData,
  CustomRequest,
} from '@data/types';
import {
  responseUnauthorized,
  responseInternalError,
} from '@utils/network/response.util';

import {NextFunction, Response} from 'express';
import jwt from 'jsonwebtoken';

// Middleware to protect APIs by verifying Bearer token
const authenticateToken = (
  req: CustomRequest<
    BytesCustomData,
    CreateByteManipulationData,
    {'Client-ID': string; 'Client-Secret': string}
  >,
  res: Response,
  next: NextFunction,
) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-change-in-prod';
  const auth = req.header('authorization');
  if (!auth || !auth.startsWith('Bearer '))
    return responseUnauthorized(res, {description: 'Missing Authorization'});

  const token = auth.slice(7);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // attach client info to req
    // console.log({payload});

    if (typeof payload !== 'object')
      return responseInternalError(res, {
        description: 'Corrupt JWT, Please contact your system administrator',
      });

    req.customData = {
      ...req.customData,
      client: {
        id: payload.sub as string,
        businessId: payload.biz as string,
        scopes: (payload as any).scopes as string[],
      },
    };
    next();
  } catch (err) {
    console.error('hehe hoho: ', err);
    return responseUnauthorized(res, {description: 'Invalid Token'});
  }
};

export default authenticateToken;
