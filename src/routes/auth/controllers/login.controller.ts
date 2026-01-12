import {Response} from 'express';
import {CustomRequest, LoginBody} from '@common/types';
import {
  loginUser,
  responseBadRequest,
  responseOk,
  responseUnauthorized,
  signToken,
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

  const token = await signToken({
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  return responseOk(
    res,
    {
      description: 'Logged in',
      // body: { for future use if mobile apps are implemented -> check if it's a mobile app by checking the client id and secret provided in auth!
      //   access_token: token,
      //   token_type: 'bearer',
      //   expires_in: 1 * 60 * 60,
      // },
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
};

export default loginController;
