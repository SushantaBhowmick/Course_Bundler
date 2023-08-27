import { catachAsyncErrors } from "../middlewares/catchAsyncError.js"
import { Course } from "../models/Course.js"
import ErrorHandler from "../utils/ErrorHandler.js";

export const getAllCourses = catachAsyncErrors(async(req,res,next)=>{

    const courses = await Course.find().select("-lectures");

    res.status(200).json({
        success:true,
        courses,
    })
})

export const createCourse = catachAsyncErrors(async(req,res,next)=>{

    const {title,description,category,createdBy} = req.body;
    if(!title || !description || !category || !createdBy) return next(new ErrorHandler("Please add all fields",400))

    // const poster = req.file;

    await Course.create({
        title,
        description,
        category,
        createdBy,
        poster:{
            public_id:"tempId",
            url:"tempUrl",
        }
    })

    res.status(201).json({
        success:true,
       message:"Course Created Successfully. You can add lecture now"
    })
})