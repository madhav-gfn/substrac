import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
export const signup =async(req , res, next )=>{
    //signuplogic here
    const session= await mongoose.startSession();
    session.startTransaction();
    try{
        const {name, email, password}=req.body;
        const existingUser= await User.findOne({email});
        if(existingUser){
            const error=new Error('User already exists');
            error.statusCode=409;
            throw error;

        }

        //hash paswrod
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password, salt);
        const newUsers = await User.create([{name, email, password:hashedPassword}], {session});
        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, { expiresIn : JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success:true, message: 'User created successfully',data:{
                token,
                user:newUsers[0]
            }
        })
    }
    catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signin =async(req , res, next )=>{
    //signinlogic here
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const{ email, password}=req.body;
        const currUser= await User.findOne({email:email});
        if(!currUser){
            error=new Error('Email Id not regitered signup kar pehle');
            error.statusCode=404;
            throw error;
        }
        const ispassvalid=await bcrypt.compare(password, currUser.password);
        if(!ispassvalid){
            error= new Error( 'you can even remember a password, what a shame');
            error.statusCode= 400;
            throw error;
        }
        const token = jwt.sign({userId: currUser._id}, JWT_SECRET, { expiresIn : JWT_EXPIRES_IN});


        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success: true, message: 'signingi in', data:{
                token,
                currUser,
            }
        });
    }
    catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);

    }
}
export const signout =async(req , res, next )=>{
    //signuplogic here
}
