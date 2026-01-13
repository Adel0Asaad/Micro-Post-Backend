import {hashToken} from '@common/lib/auth';
import {prisma} from '../prisma-config';

/**
 * Verify a refresh token and return the associated user ID
 * Returns null if the token is invalid, expired, or revoked
 */
const verifyRefreshToken = async (
  token: string,
): Promise<{userId: string; tokenId: string} | null> => {
  const hashedToken = hashToken(token);

  const refreshToken = await prisma.refreshToken.findUnique({
    where: {token: hashedToken},
  });

  if (!refreshToken) {
    return null;
  }

  // Check if token is expired
  if (refreshToken.expiresAt < new Date()) {
    return null;
  }

  // Check if token is revoked
  if (refreshToken.revokedAt) {
    return null;
  }

  return {
    userId: refreshToken.userId,
    tokenId: refreshToken.id,
  };
};

export default verifyRefreshToken;
