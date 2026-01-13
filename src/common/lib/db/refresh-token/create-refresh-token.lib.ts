import {generateSecureToken, hashToken} from '@common/lib/auth';
import {prisma} from '../prisma-config';

/**
 * Create and store a new refresh token for a user
 */
const createRefreshToken = async (userId: string): Promise<string> => {
  const refreshTokenLifeTimeDays = process.env.REFRESH_TOKEN_LIFETIME_DAYS
    ? parseInt(process.env.REFRESH_TOKEN_LIFETIME_DAYS, 10)
    : 7;

  const token = generateSecureToken();
  const hashedToken = hashToken(token);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + refreshTokenLifeTimeDays);

  await prisma.refreshToken.create({
    data: {
      token: hashedToken,
      userId,
      expiresAt,
    },
  });

  return token;
};

export default createRefreshToken;
