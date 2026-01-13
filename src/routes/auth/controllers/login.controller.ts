import {Response} from 'express';
import {CustomRequest, LoginBody} from '@common/types';
import {
  loginUser,
  signToken,
  createRefreshToken,
  responseOk,
  responseBadRequest,
  responseUnauthorized,
  responseInternalError,
} from '@common/lib';

const loginController = async (
  req: CustomRequest<undefined, LoginBody>,
  res: Response,
) => {
  const {email, password} = req.body;
  if (!email || !password)
    return responseBadRequest(res, {
      description: 'Missing email or password',
    });

  const user = await loginUser(email, password);
  if (!user)
    return responseUnauthorized(res, {
      description: 'Invalid email or password',
    });

  try {
    // Generate access token (short-lived)
    const accessToken = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    // Generate refresh token (long-lived)
    const refreshToken = await createRefreshToken(user.id);

    return responseOk(
      res,
      {
        description: 'Logged in',
        body: {
          userId: user.id,
          email: user.email,
          name: user.name,
          // token: accessToken, // for future use if mobile apps are implemented -> check if it's a mobile app by checking the client id and secret provided in auth!
          //   token_type: 'bearer',
          //   expires_in: 15 * 60, // 15 minutes
        },
      },
      {
        cookies: {
          'auth-token': {
            value: accessToken,
            options: {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
            },
          },
          'refresh-token': {
            value: refreshToken,
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
    // console.error('Error in loginController:', error);
    return responseInternalError(res, {
      description: 'Internal server error',
    });
  }
};

export default loginController;
