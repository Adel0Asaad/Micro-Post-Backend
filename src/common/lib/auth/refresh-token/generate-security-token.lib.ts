import crypto from 'crypto';
/**
 * Generate a cryptographically secure random token
 */
const generateSecureToken = (): string => {
  return crypto.randomBytes(64).toString('hex');
};

export default generateSecureToken;
