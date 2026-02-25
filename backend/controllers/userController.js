import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { Session } from "../models/sessionModel.js";
import { sendOTPMail } from "../emailVerify/sendOtpMail.js";

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
        const authHeader=req.headers.authorization;
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

export const reVerify=async(req,res)=>{
    try{
        const {email}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'10m'});
        verifyEmail(token,email);
        user.token=token;
        await user.save();
        res.status(200).json({
            success:true,
            message:"Verification email sent again successfully",
            token:user.token
        })
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exist",
            })
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials",
            })
        }
        if(!user.isVerified){
            return res.status(400).json({
                success:false,
                message:"User is not verified"
            })
        }

        const accessToken=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'10d'});
        const refreshToken=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'30d'});
        user.isLoggedIn=true;
        await user.save();

        //Existing session check
        const existingSession=await Session.findOne({userId:user._id});
        if(existingSession){
            await Session.deleteOne({userId:user._id});
        }

        //Newwww session
        await Session.create({userId:user._id});
        return res.status(200).json({
            success:true,
            message:`Welcome back ${user.firstName}`,
            user:user,
            accessToken,
            refreshToken
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const logout=async(req,res)=>{
    try{
        const userId=req.id;
        await Session.deleteMany({userId:userId});
        await User.findByIdAndUpdate({_id:userId},{isLoggedIn:false});
        return res.status(200).json({
            success:true,
            message:'user Logged Out Successfully'
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export const forgotPassword=async(req,res)=>{
    try{
        const {email}=req.body;
        if(!email){
            return res.status(400).json({
            success:false,
            message:"missing email"
        })
        }
        const user =await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:'User not found'
            })
        }
        const otp=Math.floor(10000+Math.random()*90000).toString();
        const otpExpiry=new Date(Date.now()+10*60*1000) //10 mins
        user.otp=otp;
        user.otpExpiry=otpExpiry;
        await user.save();
        await sendOTPMail(otp,email);
        return res.status(200).json({
            success:true,
            message:'otp sent to email successfully'
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export const verifyOtp=async(req,res)=>{

    try{
        const {otp}=req.body
        const email=req.params.email;
        if(!otp){
            return res.status(400).json({
                success:false,
                message:'Otp is required'
            })
        }
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        if(!user.otp || !user.otpExpiry){
            return res.status(400).json({
                success:false,
                message:"Otp is not generated or already verified"
            })
        }
        if(user.otpExpiry<new Date()){
            return res.status(400).json({
                success:false,
                message:"Otp has Expired"
            })
        }
        if(otp!=user.otp){
            return res.status(400).json({
                success:false,
                message:"otp is not correct"
            })
        }
        user.otp=null;
        user.otpExpiry=null;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"otp verified successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

export const changePassword=async(req,res)=>{
    try{
        const {newPassword,confirmPassword}=req.body;
        const {email}=req.params;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        if(!newPassword || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        if(newPassword!=confirmPassword){
            return res.status(400).json({
                success:false,
                message:"passwords do not match"
            })
        }
        const hashedPassword=await bcrypt.hash(newPassword,10)
        user.password=hashedPassword;
        user.save();
        return res.status(200).json({
            success:true,
            message:"Password changed successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const getAllUsers=async(req,res)=>{
    try{
        const allUsers=await User.find();
        return res.status(200).json({
            success:true,
            users:allUsers
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}