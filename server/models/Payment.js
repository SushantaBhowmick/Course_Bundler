
import mongoose from "mongoose";

const schema = new mongoose.Schema({
title:{
    type:String,
    required:[true,"Please enter course title"],
    minLength:[4,"Title must be atleast 4 character"],
    maxLength:[80,"Title can't exceed 80 character"],
},
description:{
    type:String,
    required:[true,"Please enter course description"],
    minLength:[20,"Title must be atleast 4 character"],
},

CreatedBy:{
    type:Date,
    default:Date.now,
},
})

export const Payment = mongoose.model("Payment",schema)