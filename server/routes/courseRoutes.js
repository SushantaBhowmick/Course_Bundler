import express from "express";
import { 
    createCourse, 
    getAllCourses 
} from "../controllers/courseController.js";
const router = express.Router();
//Get All Courses without Lectures
router.route('/courses').get(getAllCourses)

//create new course  - admin
router.route('/createcourse').post(createCourse)

export default router;