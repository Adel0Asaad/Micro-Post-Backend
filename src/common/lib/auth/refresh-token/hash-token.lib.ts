import crypto from 'crypto';
/**
 * Hash a token for secure storage
 */
const hashToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export default hashToken;
