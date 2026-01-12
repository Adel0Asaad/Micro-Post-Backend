import {Response} from 'express';
import {CustomRequest, LoginBody} from '@common/types';
import {
  loginUser,
  signToken,
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
    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    return responseOk(
      res,
      {
        description: 'Logged in',
        body: {
          userId: user.id,
          email: user.email,
          name: user.name,
          // token: token, // for future use if mobile apps are implemented -> check if it's a mobile app by checking the client id and secret provided in auth!
          //   token_type: 'bearer',
          //   expires_in: 15 * 60, // 15 minutes
        },
      },
      {
        cookies: {
          'auth-token': {
            value: token,
            options: {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
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
