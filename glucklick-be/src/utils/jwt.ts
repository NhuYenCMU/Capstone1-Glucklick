import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '1h'
  })
}
export const verifyToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    if (typeof decoded === 'object' && 'userId' in decoded) {
      return decoded
    }
    throw new Error('Invalid token payload')
  } catch (error) {
    console.error('Token verification failed:', error)
    throw new Error('Invalid token')
  }
}