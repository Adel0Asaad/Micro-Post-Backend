import {prisma} from '@common/lib/db/prisma-config';
import hashToken from '../../auth/refresh-token/hash-token.lib';

/**
 * Revoke a specific refresh token
 */
const revokeRefreshToken = async (token: string): Promise<boolean> => {
  const hashedToken = hashToken(token);

  try {
    await prisma.refreshToken.update({
      where: {token: hashedToken},
      data: {revokedAt: new Date()},
    });
    return true;
  } catch (error) {
    return false;
  }
};

export default revokeRefreshToken;
