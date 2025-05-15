import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';




export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized! No Access token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error); 
        return res.status(403).json({ message: "Forbidden! Invalid token" });
    }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({message:"permission denied"});
    }
}