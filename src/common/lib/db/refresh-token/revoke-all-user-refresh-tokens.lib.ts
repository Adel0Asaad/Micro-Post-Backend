import {prisma} from '@common/lib/db/prisma-config';

/**
 * Revoke all refresh tokens for a user (useful for logout from all devices)
 */
const revokeAllUserRefreshTokens = async (userId: string): Promise<void> => {
  await prisma.refreshToken.updateMany({
    where: {
      userId,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
};

export default revokeAllUserRefreshTokens;
