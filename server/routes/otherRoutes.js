import express from "express";
import { contact, courseRequest, getDashboardStats } from "../controllers/otherController";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth";

const router = express.Router();

//contact form
router.route('/contact').post(contact)
//course request form
router.route('/contact').post(courseRequest)

//get Admin dashboard stats
router.route('/admin/stats').get(isAuthenticated,authorizeAdmin,getDashboardStats)


export default router;