
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import userModel from '../models/user_model';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { isAdmin } from 'middlewares/auth_middleware';


const loginController = async (req: Request, res: Response): Promise<any> => {
    const {email, password} = req.body;

    if(email === undefined || password === undefined) {
        return res.status(400).json({ message: 'Email and password are required' });
    }


    try {
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(401).json({ message: 'This user does not exist' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if(user.role === 'admin' && !user.isAdmin){
            user.isAdmin = true;
            await user.save();
        }

        const accessToken = generateAccessToken({id:user._id, role:user.role, isAdmin:user.isAdmin});
        const refreshToken = generateRefreshToken({id:user._id});

        return res.status(200).json({
            message: 'Login successful',accessToken, refreshToken})
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
        
    }
};


export default loginController