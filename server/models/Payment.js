
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    razorpay_signature:{
        type: String,
        required:true,
    },razorpay_payment_id:{
        type: String,
        required:true,
    },razorpay_subcription_id:{
        type: String,
        required:true,    
    },
CreatedAt:{
    type:Date,
    default:Date.now,
},
})

export const Payment = mongoose.model("Payment",schema);