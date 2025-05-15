

import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '14d' }); // ACCESS_TOKEN expires in 15 minutes
};

export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '30d' }); // REFRESH_TOKEN expires in 7 days
};