import { catachAsyncErrors } from "../middlewares/catchAsyncError.js";


export const contact = catachAsyncErrors(async(req,res,next)=>{

    const {name,email,message} = req.body;

    const to = process.env.MY_MAIL;
    const subject = "Contact from CourseBundler";
    const text = `I am ${name} and my email is ${email}.\n${message}`


    res.status(200).json({
        success:true,
    })
})

export const courseRequest = catachAsyncErrors(async(req,res,next)=>{



    res.status(200).json({
        success:true,
    })
})

export const getDashboardStats = catachAsyncErrors(async(req,res,next)=>{



    res.status(200).json({
        success:true,
    })
})