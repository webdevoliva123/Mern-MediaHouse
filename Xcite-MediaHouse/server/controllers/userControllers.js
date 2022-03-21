const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../middlewares/generateToken");
const bycrpt = require("bcryptjs");
const Blog = require("../models/blogModel");
const jounModel = require("../models/jounModel");


// User Register
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password} = req.body;


    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(404);
        throw new Error("User already exists");
    } else {

        const user = await User.create({
            name, email, password
        });

        if (user) {
            res.status(200).json({
                success: true,
                message: "User Register Successfully",
                user
            });
           
        } else {
            res.status(404);
            throw new Error("User not created");
        }
    }
});


// Login existing users
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            success: true,
            data: user,
            token: generateToken(user._id),
        });
    } else {
        res.status(404);
        throw new Error("Invalid email or password.");
    }
});


// Update User Avatar
const updateUserAavatar = asyncHandler(async (req,res) => {
    const {avatar,userId} = req.body;
    
    const updateData = await User.findOneAndUpdate({_id : userId},{$set : {profilePicture : avatar}});

    if(updateData){
        res.status(200).json({
            success : true,
            message : "User Avatar Updated",
        })
    }else{
        return res.status(404).json({
            success : false,
            error : "User Not Found"
        })
    }
}) 

// Update User Name
const updateUserName = asyncHandler(async (req,res) => {
    const {userId,name} = req.body;

    const updateData = await User.findOneAndUpdate({_id : userId},{$set : {name}});

    if(updateData){
        res.status(200).json({
            success : true,
            message : "User Name Updated",
        })
    }else{
        return res.status(404).json({
            success : false,
            error : "User Not Found"
        })
    }
})

// Update User Email
const updateUserEmail = asyncHandler(async (req,res) => {
    const {userId,currentPassword,newEmail} = req.body;

    const user = await User.findById(userId);

    if(user){

        if(await user.matchPassword(currentPassword)){
            await User.updateOne({$set : {email : newEmail}})
            res.status(200).json({
                success : true,
                message : "User Email Updated",
            })
        }else{
            return res.status(404).json({
                success : false,
                error : "Invalid Password"
            })
        }
        

    }else{
        return res.status(404).json({
            success : false,
            error : "User Not Found"
        })
    }
})

// Update User Password
const updateUserPassword = asyncHandler(async (req,res) => {
    const {userId,currentPassword,newPassword} = req.body;

    const user = await User.findById(userId);

    if(user){

        if(await user.matchPassword(currentPassword)){

            const hashPassword  =  await bycrpt.hash(newPassword,5);

            await User.updateOne({$set : {password : hashPassword}})
            res.status(200).json({
                success : true,
                message : "User Password Updated",
            })
        }else{
            return res.status(404).json({
                success : false,
                error : "Invalid Password"
            })
        }
        

    }else{
        return res.status(404).json({
            success : false,
            error : "User Not Found"
        })
    }
})

// User Like Blog
const userLikeBlog = asyncHandler(async (req,res) => {
    const {blogId,userId} = req.body;

    const user = await User.findById(userId);

    if(user){
        const blog = await Blog.findById(blogId)
        const likesData = blog.likes;
        const alreadyLiked = likesData.filter((e) => {
            if(e === userId){
                return e
            }
        })

       const isAlreadyLiked = alreadyLiked.length <= 0 ? true : false;
        if(isAlreadyLiked){
            await Blog.updateOne({_id : blogId},{$push : {likes : userId}})
        .then(() => {
            res.status(200).json({
                success : true,
                message : "Blog found & liked",
            })

        }).catch(() => {
            return res.status(400).json({
                success : false,
                error : "Blog not found",
            })
        })
        }else{
            return res.status(400).json({
                success : false,
                error : "User Already like this blog",
            })
        }

    }else{
        return res.status(404).json({
            success : false,
            error : "User is aunthorized"
        })
    }
})


// User Remove Like Blog
const userRemoveLikeFromBlog = asyncHandler(async (req,res) => {
    const {blogId,userId} = req.body;

    const user = await User.findById(userId);

    if(user){
        const blog = await Blog.findById(blogId)
        const likesData = blog.likes;
        const alreadyRemoveLiked = likesData.filter((e) => {
            if(e === userId){
                return e
            }
        })

       const isAlreadyRemoveLiked = alreadyRemoveLiked.length > 0 ? true : false;
        if(isAlreadyRemoveLiked){
            await Blog.updateOne({_id : blogId},{$pull : {likes : userId}})
        .then(() => {
            res.status(200).json({
                success : true,
                message : "Blog found & removeLiked",
            })

        }).catch(() => {
            return res.status(400).json({
                success : false,
                error : "Blog not found",
            })
        })
        }else{
            return res.status(400).json({
                success : false,
                error : "no user found in like section",
            })
        }

    }else{
        return res.status(404).json({
            success : false,
            error : "User is aunthorized"
        })
    }
})




module.exports = { registerUser, userLogin, updateUserAavatar, updateUserName , updateUserEmail, updateUserPassword , userLikeBlog, userRemoveLikeFromBlog};