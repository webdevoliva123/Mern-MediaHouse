const asyncHandler = require("express-async-handler");
const Journalist = require('../models/jounModel');
const bycrpt = require('bcryptjs');
const generateToken = require("../middlewares/generateToken");
const Blog = require("../models/blogModel");


// Journalist Register
const jounRegister = asyncHandler(async(req,res) => {
    const {name,email,password,resume} = req.body;
    
    const journalist = await Journalist.findOne({email});

    if(!journalist){

        const hashPassword = await bycrpt.hash(password,5);

        const newJoun =  await Journalist.create({
            name,
            email,
            password : hashPassword,
            resume
        })

        if(newJoun){
            res.status(200).json({
                success : true,
                message : "User Register Successfully!",
                joun : newJoun
            })
        }


    }else{
        return res.status(400).json({
            success : false,
            error : "User Already Registered!"
        })
    }

})

// Jounarlist Login
const jounLogin = asyncHandler(async(req,res) => {
    const { email, password } = req.body;

    const journalist = await Journalist.findOne({ email });

    if(journalist){
        const passwordMatched =  await bycrpt.compare(password,journalist.password);

        if(passwordMatched){
            res.status(200).json({
                success : true,
                message : "Journalist login successfully",
                token : generateToken(journalist._id)
            })
        }else{
            return res.status(404).json({
                success : false,
                error : "Invalid email or password"
            })
        }
        

    }else{
        return res.status(404).json({
            success : false,
            error : "Invalid email or password"
        })
    }
    
})

// Get Journalist By Name
const getJounByName = asyncHandler(async (req,res) => {
    const journalist = await Journalist.find({ name : req.params.search });

    if (Journalist) {
        res.status(200).json({
            success: true,
            data: journalist,
        });
    } else {
        return res.status(404).json({
            success: false,
            error: "No Journalist Found",
        });
    }
}) 


// Update Joun Avatar
const updateJounAvatar = asyncHandler(async (req,res) => {
    const {jounId,avatarLink} = req.body;

    const journalist = await Journalist.findById(jounId);

    if(journalist.isjournalist){
        const updateData = await Journalist.findOneAndUpdate({_id : jounId},{$set : {profilePicture : avatarLink}});

        if(updateData){
            res.status(200).json({
                success : true,
                message : "Joun Avatar Updated",
            })
        }else{
            return res.status(404).json({
                success : false,
                error : "User Not Found"
            })
        }
    }else{
        return res.status(404).json({
            success : false,
            error : "Joun Not Authorized"
        })
    }
}) 


// Update Joun Name
const updateJounName = asyncHandler(async (req,res) => {
    const {jounId,name} = req.body;

    const journalist = await Journalist.findById(jounId);

    if(journalist.isjournalist){
        const updateData = await Journalist.findOneAndUpdate({_id : jounId},{$set : {name}});

        if(updateData){
            res.status(200).json({
                success : true,
                message : "Joun Name Updated",
            })
        }else{
            return res.status(404).json({
                success : false,
                error : "User Not Found"
            })
        }
    }else{
        return res.status(404).json({
            success : false,
            error : "Joun Not Authorized"
        })
    }
})

// Update Joun Email
const updateJounEmail = asyncHandler(async (req,res) => {
    const {jounId,currentPassword,newEmail} = req.body;
    const journalist = await Journalist.findById(jounId);
    if(journalist.isjournalist){
        const passwordMatched =  await bycrpt.compare(currentPassword,journalist.password);
        if(passwordMatched){
            await Journalist.updateOne({$set : {email : newEmail}});

            res.status(200).json({
                success : true,
                message : "Joun Email Updated",
            })
        }else{
            return res.status(401).json({
                success : false,
                error : "Invalid Password!"
            })
        }
    }else{
        return res.status(401).json({
            success : false,
            error : "Joun Not Athuo."
        })
    }
})

// Update Joun Password
const updateJounPassword = asyncHandler(async (req,res) => {
    const {jounId,currentPassword,newPassword} = req.body;
    const journalist = await Journalist.findById(jounId);
    if(journalist.isjournalist){
        const passwordMatched =  await bycrpt.compare(currentPassword,journalist.password);
        if(passwordMatched){
            const hashPassword =  await bycrpt.hash(newPassword,5);

            await Journalist.updateOne({$set : {password : hashPassword}});

            res.status(200).json({
                success : true,
                message : "Joun Password Updated",
            })
        }else{
            return res.status(401).json({
                success : false,
                error : "Invalid Password!"
            })
        }
    }else{
        return res.status(401).json({
            success : false,
            error : "Joun Not Athuo."
        })
    }
})

// Get all latest blog by jounId
const getAllBlogsOfJounById = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({ jounId: req.params.id });

    const latestBlog = [];

    for(let i = 0; i< Blogs.length; i++){
        latestBlog.push(Blogs[Blogs.length - (i+1)])
    }

    if (Blogs) {
        res.status(200).json({
            success: true,
            data: latestBlog,
        });
    } else {
        return res.status(404).json({
            success: false,
            error: "No Blog found",
        });
    }
});

// // Update Blog Of Joun
// const updateBlogOfJoun = () => {
//     const {jounId,blogId,title,description}
// }


module.exports = { jounRegister, jounLogin, updateJounName , updateJounAvatar , getJounByName , updateJounEmail , updateJounPassword , getAllBlogsOfJounById}