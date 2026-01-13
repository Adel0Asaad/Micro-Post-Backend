import {prisma} from '@common/lib/db/prisma-config';
import generateSecureToken from '../../auth/refresh-token/generate-security-token.lib';
import hashToken from '../../auth/refresh-token/hash-token.lib';

/**
 * Rotate a refresh token - revoke the old one and create a new one
 * This provides security against token theft
 */
const rotateRefreshToken = async (
  oldToken: string,
  userId: string,
): Promise<string | null> => {
  const refreshTokenLifeTimeDays = process.env.REFRESH_TOKEN_LIFETIME_DAYS
    ? parseInt(process.env.REFRESH_TOKEN_LIFETIME_DAYS, 10)
    : 7;

  const hashedOldToken = hashToken(oldToken);

  // Create new token
  const newToken = generateSecureToken();
  const hashedNewToken = hashToken(newToken);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + refreshTokenLifeTimeDays);

  try {
    // Use a transaction to ensure atomicity
    await prisma.$transaction(async (tx) => {
      // Create new refresh token
      const newRefreshToken = await tx.refreshToken.create({
        data: {
          token: hashedNewToken,
          userId,
          expiresAt,
        },
      });

      // Revoke the old token and link to the new one
      await tx.refreshToken.update({
        where: {token: hashedOldToken},
        data: {
          revokedAt: new Date(),
          replacedBy: newRefreshToken.id,
        },
      });
    });

    return newToken;
  } catch (error) {
    console.error('Error rotating refresh token:', error);
    return null;
  }
};

export default rotateRefreshToken;
