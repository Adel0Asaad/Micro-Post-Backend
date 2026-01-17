import jwt, {JwtPayload} from 'jsonwebtoken';

const getSession = (authToken: string): JwtPayload => {
  if (!authToken) return null;

  try {
    const session = jwt.verify(authToken, process.env.JWT_SECRET) as JwtPayload;
    return session;
  } catch (error) {
    console.error('Get session JWT verification error:', error);
    return null;
  }
};

export default getSession;
