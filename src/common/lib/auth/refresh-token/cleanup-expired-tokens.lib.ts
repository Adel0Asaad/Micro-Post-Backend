import {prisma} from '@common/lib/db/prisma-config';

/**
 * Clean up expired refresh tokens (can be run as a scheduled job)
 */
const cleanupExpiredTokens = async (): Promise<number> => {
  const result = await prisma.refreshToken.deleteMany({
    where: {
      OR: [{expiresAt: {lt: new Date()}}, {revokedAt: {not: null}}],
    },
  });
  return result.count;
};

export default cleanupExpiredTokens;
