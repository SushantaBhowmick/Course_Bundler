import { catachAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import { instance } from "../server.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import crypto from 'crypto';
import {Payment} from '../models/Payment.js'

export const buySubcription = catachAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user._id);

    if(user.role === 'admin') return next(new ErrorHandler("Admin can't buy subscription",400))
 
    const plan_id = process.env.PLAN_ID;

    const subcription = await instance.subscriptions.create({
        plan_id,
        customer_notify: 1,
        total_count: 12,
    });
    user.subcription.id = subcription.id;
    user.subcription.status = subcription.status;

    await user.save();

    res.status(201).json({
        success:true,
        subcriptionId: subcription.id
    })
})


export const paymentverification = catachAsyncErrors(async (req, res, next) => {

    const {razorpay_signature,razorpay_payment_id,razorpay_subcription_id}= req.body;

    const user = await User.findById(req.user._id);
    const subcription_id = user.subcription.id;

    const generated_signature = crypto
    .createHmac("sha256",process.env.RAZORPAY_API_SECRET)
    .update(razorpay_payment_id + "|" + subcription_id,"utf-8")
    .digest("hex")

    const isAuthntic = generated_signature === razorpay_signature;
    if(!isAuthntic) return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`)

    //database comes here
    await Payment.create({
        razorpay_signature,
        razorpay_payment_id,
        razorpay_subcription_id,
    })

    user.subcription.status = "active";
    await user.save()
   
    res.redirect(`${process.env.FRONTEND_URL}/paymentsuccess?refernce=${razorpay_payment_id}`)

})

export const getRazorpayKey = catachAsyncErrors(async(req,res,next)=>{

    res.status(200).json({
        success:true,
        key:process.env.RAZORPAY_API_KEY,
    })
})

export const cancelSubcription = catachAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user._id);
    const subcriptionId = user.subcription.id;
 let refund = false;
 await instance.subscriptions.cancel(subcriptionId)

 const payment = await Payment.findOne({
    razorpay_subcription_id: subcriptionId,
 });

 const gap = Date.now() - payment.createdAt;
 const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;

 if(refundTime>gap){
    await instance.payments.refund(payment.razorpay_payment_id)
    refund= true;
 }

 await payment.deleteOne();
 user.subcription.id= undefined;
 user.subcription.status= undefined;
 


    res.status(200).json({
        success:true,
        message:refund? "Subcription cancelled, You Will recived full refund within 7 days."
                :"Subcription cancelled, Now refund initiated as subcription was cancelled after 7 days"
    })
})