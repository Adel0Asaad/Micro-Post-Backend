import {Response} from 'express';
import {
  createUser,
  responseBadRequest,
  responseConflict,
  responseInternalError,
  responseOk,
  signToken,
} from '@common/lib';
import {prisma} from '@common/lib/db/prisma-config';
import {CustomRequest, RegisterBody} from '@common/types';

const register = async (
  req: CustomRequest<undefined, RegisterBody>,
  res: Response,
) => {
  try {
    const {email, password, name} = req.body;

    // Validate input
    if (!email || !password || !name) {
      return responseBadRequest(res, {
        description: 'Email, password, and name are required',
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {email},
    });

    if (existingUser) {
      return responseConflict(res, {
        description: 'User with this email already exists',
      });
    }

    // Create user
    const user = await createUser(email, password, name);

    // Create JWT token
    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    return responseOk(
      res,
      {
        description: 'Registration successful',
        body: {
          id: user.id,
          email: user.email,
          name: user.name,
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
    console.error('Registration error:', error);
    return responseInternalError(res, {
      description: 'Internal server error',
    });
  }
};

export default register;
