import { catachAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js"
import { Course } from "../models/Course.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from 'crypto'


//register
export const register = catachAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    // const file = req.file
    if (!name || !email || !password)
        return next(new ErrorHandler("Please enter all fields", 400))

    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User already exists", 400))

    //upload file on cloudinary

    user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "tempId",
            url: "tempUrl"
        }
    })
    sendToken(res, user, "Register Successfully", 201)

})

//Login
export const login = catachAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // const file = req.file
    if (!email || !password)
        return next(new ErrorHandler("Please enter all fields", 400))

    let user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401))

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next(new ErrorHandler("Incorrect Email or Password", 401))

    sendToken(res, user, `Welcome Back ${user.name}`, 200)

})

//logout 
export const logout = catachAsyncErrors(async (req, res, next) => {
    res.status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
        }).json({
            success: true,
            message: "Logged Out successfully!"
        })
})

//get My Profile 
export const getMyProfile = catachAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })
})

//changePassword
export const changePassword = catachAsyncErrors(async (req, res, next) => {

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
        return next(new ErrorHandler("Please enter all fields", 400))

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return next(new ErrorHandler("Incorrect Old Password", 400))

    user.password = newPassword;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Password changed successfully"
    })
})

//updateProfile
export const updateProfile = catachAsyncErrors(async (req, res, next) => {

    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Update Profile successfully"
    })
})

//updateProfile picture
export const updateProfilePicture = catachAsyncErrors(async (req, res, next) => {

    //cloudinary todo


    res.status(200).json({
        success: true,
        message: "Profile Picture Updated successfully"
    })
})


//forgotPassword
export const forgotPassword = catachAsyncErrors(async (req, res, next) => {

    const { email } = req.body;

    const user = await User.findOne({ email })
    if (!user) return next(new ErrorHandler("User not found", 404))

    const resetToken = await user.getResetToken();
    await user.save();

    const url = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`
    const message = `Click on the link to reset your password. ${url}. if you have not requested then please ignore`

    //send Token via email
    await sendEmail(user.email, "CourseBundler Reset Password", message)

    res.status(200).json({
        success: true,
        message: `Reset Token has sent to ${user.email}`,
    })
})

//resetPassword
export const resetPassword = catachAsyncErrors(async (req, res, next) => {

    const { token } = req.params;

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now(),
        },
    })
    if (!user) return next(new ErrorHandler("Token is invalid or has been expired", 400))

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save()

    res.status(200).json({
        success: true,
        message: "Password Changed Successfully!",
    })
})





//add to playlist
export const addtoPlayList = catachAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user._id)

    const course = await Course.findById(req.body.id)

    if(!course) return next(new ErrorHandler("Invalid Course Id",404))

    const itemExits = user.playlist.find((item)=>{
        if(item.course.toString()=== course._id.toString()) return true;
    })

    if(itemExits) return next(new ErrorHandler("Item Already Exits",409))

    user.playlist.push({
        course:course._id,
        poster:course.poster.url,
    })
    await user.save();
    res.status(200).json({
        success: true,
        message: "Added to Playlist",
    })

})

//remove from playlist
export const removeFromPlayList = catachAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user._id)

    const course = await Course.findById(req.query.id)

    if(!course) return next(new ErrorHandler("Invalid Course Id",404))

    const newPlaylist = user.playlist.filter((item)=>{
        if(item.course.toString() !== course._id.toString()) return item
    })

    user.playlist = newPlaylist;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Remove From Playlist",
    })

})




export const getAllUser = catachAsyncErrors(async (req, res, next) => {
    const user = await User.find();

    // sendToken(res,user,"Successfully get all user",200)
    res.send(user)

})