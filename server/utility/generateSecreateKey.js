import crypto from 'crypto';
import { promisify } from 'util';

const generateSecretKey = async () => {
  const randomBytes = promisify(crypto.randomBytes);
  const buffer = await randomBytes(32);
  const secretKey = buffer.toString('base64');
  return secretKey;
};

export const JWT_SECRET = await generateSecretKey();
