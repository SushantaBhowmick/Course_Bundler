import { catachAsyncErrors } from "../middlewares/catchAsyncError.js"
import { Course } from "../models/Course.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from 'cloudinary'
import { Stats } from '../models/Stats.js'


export const getAllCourses = catachAsyncErrors(async (req, res, next) => {

    const courses = await Course.find().select("-lectures");

    res.status(200).json({
        success: true,
        courses,
    })
})

export const createCourse = catachAsyncErrors(async (req, res, next) => {

    const { title, description, category, createdBy } = req.body;
    if (!title || !description || !category || !createdBy) return next(new ErrorHandler("Please add all fields", 400))

    const file = req.file;

    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content)


    await Course.create({
        title,
        description,
        category,
        createdBy,
        poster: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    })

    res.status(201).json({
        success: true,
        message: "Course Created Successfully. You can add lecture now"
    })
})

export const deleteCourse = catachAsyncErrors(async (req, res, next) => {

    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) return next(new ErrorHandler("Course Not Found", 404))

    await cloudinary.v2.uploader.destroy(course.poster.public_id)
    
    for (let i = 0; i < course.lectures.length; i++) {
       const singleLecures = course.lectures[i];

    await cloudinary.v2.uploader.destroy(singleLecures.video.public_id,{
        resource_type:"video"
    })
        
    }
    await course.deleteOne();

    res.status(200).json({
        success: true,
        message: "Course Deleted Successfully"
    })
})

//max video size 100mb
//add Course lectures
export const addLectures = catachAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;

    
    const course = await Course.findById(id);
    if (!course) return next(new ErrorHandler("Course Not Found", 404))

    const file = req.file;

    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content,{
        resource_type:"video"
    })


    course.lectures.push({
        title,
        description,
        video: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    });
    course.numOfVideos = course.lectures.length;
    await course.save();

    res.status(200).json({
        success: true,
        message: "Lecture added in Course"
    })
})

//delete Lectures
export const deleteLectures = catachAsyncErrors(async (req, res, next) => {

    const { courseId,lectureId } = req.query;

    const course = await Course.findById(courseId);
    if (!course) return next(new ErrorHandler("Course Not Found", 404))

    const lecture = course.lectures.find((item)=>{
        if(item._id.toString() === lectureId.toString()) return item
    })

    await cloudinary.v2.uploader.destroy(lecture.video.public_id,{
        resource_type:"video"
    })

    course.lectures = course.lectures.filter((item)=>{
        if(item._id.toString() === lectureId.toString()) return item
    })
    course.numOfVideos = course.lectures.length;
    await course.save();
  
    res.status(200).json({
        success: true,
        message: "Lectures Deleted Successfully"
    })
})


//get Course lectures
export const getCourseLectures = catachAsyncErrors(async (req, res, next) => {

    const course = await Course.findById(req.params.id);
    if (!course) return next(new ErrorHandler("Lecture Not Found", 404))

    course.views += 1;

    await course.save();

    res.status(200).json({
        success: true,
        lectures: course.lectures,
    })
})


Course.watch().on("change", async () => {
    const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  
    const courses = await Course.find({});
  
    let totalViews = 0;
  
    for (let i = 0; i < courses.length; i++) {
      totalViews += courses[i].views;
    }
    stats[0].views = totalViews;
    stats[0].createdAt = new Date(Date.now());
  
    await stats[0].save();
  });