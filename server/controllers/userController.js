import { catachAsyncErrors } from "../middlewares/catchAsyncError.js";
import {User} from "../models/User.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendToken } from "../utils/sendToken.js";


//register
export const register =catachAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;

    // const file = req.file
    if(!name || !email || !password) 
    return next(new ErrorHandler("Please enter all fields",400))

    let user = await User.findOne({email});
    if(user) return next(new ErrorHandler("User already exists",400))

    //upload file on cloudinary

    user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"tempId",
            url:"tempUrl"
        }
    })
    sendToken(res,user,"Register Successfully",201)

})

//Login
export const login =catachAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

    // const file = req.file
    if(!email || !password ) 
    return next(new ErrorHandler("Please enter all fields",400))

    let user = await User.findOne({email}).select("+password");
    if(!user) return next(new ErrorHandler("Incorrect Email or Password",401))

    const isMatch = await user.comparePassword(password);
    if(!isMatch) return next(new ErrorHandler("Incorrect Email or Password",401))

    sendToken(res,user,`Welcome Back ${user.name}`,200)

})

//logout 
export const logout = catachAsyncErrors(async(req,res,next)=>{
    res.status(200)
    .cookie("token",null,{
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"Logged Out successfully!"
    })
})

//get My Profile 
export const getMyProfile = catachAsyncErrors(async(req,res,next)=>{
    
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success:true,
        user
    })
})



export const getAllUser = catachAsyncErrors(async(req,res,next)=>{
    const user = await User.find();

    // sendToken(res,user,"Successfully get all user",200)
    res.send(user)

})