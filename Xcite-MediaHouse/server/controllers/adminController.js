const asyncHandler = require('express-async-handler');
const Blog = require('../models/blogModel');
const Journalist = require('../models/jounModel');
const User = require('../models/userModel');

// Accept Journalist
const acceptJournalist = asyncHandler(  async (req,res) => {
    const journalist = await Journalist.findById(req.params.id);
    if(journalist){
        await Journalist.findByIdAndUpdate(req.params.id,{isjournalist : true});
        
        if(!journalist.isjournalist){
            res.status(200).json({
                success : true,
                message : "Journalist Is Accepted As Confirmed Journalist"
            })
        }else{
            res.status(200).json({
                success : true,
                message : "Journalist Is Already Accepted As Confirmed Journalist"
            })
        }

    }else{
        return res.status(400).json({
            success : false,
            error : "Journalist Not Found"
        })
    }
});

// Reject Journalist
const rejectJournalist = asyncHandler(  async (req,res) => {
    const journalist = await Journalist.findById(req.params.id);
    if(journalist){
        await Journalist.remove({_id: req.params.id}).then(() => {
            res.status(200).json({
                success : true,
                message : "Journalist Got Rjeceted"
            })
        }).catch(() => {
            return res.status(404).json({
                success : true,
                message : "Journalist Not Found"
            })
        })
        
        

    }else{
        return res.status(400).json({
            success : false,
            error : "Journalist Not Found"
        })
    }
})

// Get Total No. Of  Blog of Website
const totalBlogOfWeb = asyncHandler(async (req,res) => {
    const {jounId} = req.body;

    const journalist = await Journalist.findById(jounId);

    if(journalist.isAdmin){
        const jounBlog = await Blog.find();

        res.status(200).json({
            success : true,
            message : jounBlog.length
        })
    }else{
        return res.status(404).json({
            success : false,
            error : "User is UnAthou"
        })
    }

})


// Get Total No. Of  Journalist of Website
const totalJounOfWeb = asyncHandler(async (req,res) => {
    const {jounId} = req.body;

    const journalist = await Journalist.findById(jounId);

    if(journalist.isAdmin){
        const joun = await Journalist.find();

        res.status(200).json({
            success : true,
            message : joun.length
        })
    }else{
        return res.status(404).json({
            success : false,
            error : "User is UnAthou"
        })
    }

})



// Get Total No. Of  User of Website
const totalUserOfWeb = asyncHandler(async (req,res) => {
    const {jounId} = req.body;

    const journalist = await Journalist.findById(jounId);

    if(journalist.isAdmin){
        const user = await User.find();

        res.status(200).json({
            success : true,
            message : user.length
        })
    }else{
        return res.status(404).json({
            success : false,
            error : "User is UnAthou"
        })
    }

})


module.exports = {acceptJournalist,rejectJournalist,totalBlogOfWeb,totalJounOfWeb,totalUserOfWeb}