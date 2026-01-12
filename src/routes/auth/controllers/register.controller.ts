import {BytesCustomData, CustomRequest} from '@data/types';
import {Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  responseBadRequest,
  responseInternalError,
  responseOk,
  responseUnauthorized,
} from '@common/lib';
import {prisma} from '@common/lib/db/prisma-config';

const TOKEN_LIFETIME = '16h'; // 16 hours

const generateToken = async (
  req: CustomRequest<
    BytesCustomData,
    undefined,
    {'client-id': string; 'client-secret': string}
  >,
  res: Response,
) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-change-in-prod';
  const {'client-id': client_id, 'client-secret': client_secret} = req.headers;
  if (!client_id || !client_secret)
    return responseBadRequest(res, {
      description: 'Missing Client-ID or Client-Secret',
    });

  const client = await prisma.node.findUnique({where: {id: client_id}});
  if (!client)
    return responseUnauthorized(res, {description: 'invalid_client'});

  if (!client.businessId)
    return responseInternalError(res, {
      description:
        'Corrupted client, please contact your system administrator - MISSING BUSINESS ID',
    });
  const business = await prisma.business.findUnique({
    where: {id: client.businessId},
  });

  if (!business)
    return responseInternalError(res, {
      description:
        'Corrupted client, please contact your system administrator - MISSING BUSINESS DETAILS',
    });

  const secretValid = await bcrypt.compare(client_secret, client.secret);
  if (!secretValid)
    return responseUnauthorized(res, {
      description: 'invalid_secret',
    });

  await prisma.node.update({
    data: {lastLogin: new Date()},
    where: {id: client_id, businessId: business.id},
  });

  const token = jwt.sign(
    {
      sub: client_id,
      biz: business.id,
      scopes: client.scope,
    },
    JWT_SECRET,
    {
      expiresIn: TOKEN_LIFETIME,
    },
  );
  return responseOk(res, {
    description: 'Logged in',
    body: {
      access_token: token,
      token_type: 'bearer',
      expires_in: 16 * 60 * 60,
    },
  });
};

export default generateToken;
