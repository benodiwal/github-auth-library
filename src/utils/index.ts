import crypto from 'crypto';

export function generateRandomState(): string {
  return crypto.randomBytes(16).toString('hex');
}
