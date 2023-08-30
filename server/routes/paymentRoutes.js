import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route('/subscribe').post(isAuthenticated,)


export default router;