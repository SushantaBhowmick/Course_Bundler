import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { 
    buySubcription, 
    cancelSubcription, 
    getRazorpayKey, 
    paymentverification 
} from "../controllers/paymentController.js";

const router = express.Router();

router.route('/subscribe').get(isAuthenticated,buySubcription)

//verify payment adn save reference in database
router.route('/paymentverification').post(isAuthenticated,paymentverification)


//get Razorpay key
router.route('/razorpaykey').get(isAuthenticated,getRazorpayKey)
//cancel subcription
router.route('/subscribe/cancel').delete(isAuthenticated,cancelSubcription)

export default router;