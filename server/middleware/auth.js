import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../utility/generateSecreateKey.js';

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      return res.status(403).send('Access Denied');
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, JWT_SECRET, (err, decode) => {
      if (err) {
        // Handle JWT verification error
        console.error('JWT verification error:', err);
        return res.status(401).send('Invalid token');
      }

      return decode;
    });

    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
