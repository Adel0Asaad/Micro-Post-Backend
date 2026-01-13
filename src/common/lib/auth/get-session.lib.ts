import jwt, {JwtPayload} from 'jsonwebtoken';

const getSession = (authToken: string): JwtPayload => {
  if (!authToken) return null;

  const session = jwt.verify(authToken, process.env.JWT_SECRET) as JwtPayload;
  return session;
};

export default getSession;
