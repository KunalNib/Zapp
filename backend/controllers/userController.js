import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { verifyEmail } from "../emailVerify/verifyEmail.js";

export const register=async(req,res)=>{
    try{
        const {firstName,lastName,email,password}=req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({success:false,message:"All fields are requied"});
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({success:false,message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);//10->salt
        const newUser=await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword
        });
        const token=jwt.sign({id:newUser._id},process.env.SECRET_KEY,{expiresIn:"10m"}); //expires in 10 min
        verifyEmail(token,email);
        newUser.token=token;
        await newUser.save();
        return res.status(201).json({success:true,message:"User registered successfully",user:newUser});
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
}

export const verify=async(req,res)=>{
    try{
        const authHeader=req.headers.authorization
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            res.status(400).json({
                success:false,
                message:"Authorization token is missing or invalid"
            })
        }
        const token=authHeader.split(" ")[1] // [Bearer ,token----]
        let decoded;
        try{
            decoded=jwt.verify(token,process.env.SECRET_KEY);
        }catch(error){
            if(error.name==="TokenExpiredError"){
                return res.status(400).json({
                    success:false,
                    message:"The registeration token has expired"
                })
            }
            return res.status(400).json({
                success:"false",
                message:"Token verification Failed"
            })
        }
        const user=await User.findById(decoded.id)
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        user.token=null;
        user.isVerified=true;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"Email verified successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}