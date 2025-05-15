
import {Request, Response} from 'express';
import userModel from '../models/user_model';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

const createUser = async (req: Request, res: Response):Promise<any> => {

    const {name, email, password, role} = req.body;

    if(!name || !email || !password ){
        return res.status(400).json({
            message: 'Please provide all required fields'
        });
    } else if(!email.includes('@') && !email.includes('.')) {
        return res.status(400).json({
            message: 'Please provide a valid email'
        });
    } else if(password.length < 6) {
        return res.status(400).json({
            message: 'Password must be at least 6 characters long'
        });
    } else if(!name.match(/^[a-zA-Z ]+$/)) {
        return res.status(400).json({
            message: 'Name must contain only letters and spaces'
        });
    }


    try {
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exisit! Please login"});
        }

        const newUser = await userModel.create({
            name,
            email,
            password,
            role
        });

        const {password: _,isAdmin:__, ...user} = newUser.toObject();

        const accessToken = generateAccessToken({id:user._id, role:user.role});
        const refreshToken = generateRefreshToken({id:user._id});
        return res.status(201).json({user: user});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"})
        
    }
};

export default createUser