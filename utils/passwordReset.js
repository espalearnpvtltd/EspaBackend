import crypto from 'crypto';

/**
 * Generate a random password reset token
 * @returns {string} Reset token
 */
export const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Hash the reset token for storage in database
 * @param {string} token - Reset token
 * @returns {string} Hashed token
 */
export const hashResetToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

/**
 * Generate password reset URL
 * @param {string} baseUrl - Base URL of frontend
 * @param {string} token - Reset token
 * @returns {string} Reset URL
 */
export const generateResetUrl = (baseUrl, token) => {
  return `${baseUrl}/reset-password?token=${token}`;
};

/**
 * Check if reset token is expired
 * @param {Date} expireTime - Token expiration time
 * @returns {boolean} True if expired, false otherwise
 */
export const isTokenExpired = (expireTime) => {
  return new Date() > expireTime;
};
