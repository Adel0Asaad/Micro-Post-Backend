import {JwtPayload} from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

const TOKEN_LIFETIME = '15m'; // 15 minutes

const signToken = async (payload: JwtPayload): Promise<string> => {
  if (!process.env.JWT_SECRET)
    throw new Error('JWT_SECRET is not defined in environment variables');
  const token = jwt.sign(
    //
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: TOKEN_LIFETIME,
    },
  );
  return token;
};

export default signToken;
