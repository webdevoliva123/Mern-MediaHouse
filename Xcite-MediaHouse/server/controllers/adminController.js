const asyncHandler = require('express-async-handler');
const nodeMailSender = require('../middlewares/mailSender');
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

            const get_html_message = (userName) => {
                return `
                    <p>Dear, <b>${userName}</b></p>
                    </br>
                    <p>Congratulation! You got selected for Journalist Role In Mern-MediaHouse.</p>
                    <p>Now, You can create your blogs on Mern-MediaHouse</p>
                    </br>
                    </br>
                    <a href="http://localhost:8080/api/v2/auth/journalist/login" target="_blank"><button style="padding:10px 30px; border:none; outline: none; cursor: pointer; border-radius: 2px; background:crimson; color:#fff;">Login</button></a>
                    </br>
                    </br>
                    </br>
                    <h2>Thank You</h3>
                 `
            }
           
            nodeMailSender(journalist.email,"Mern-MediaHouse : Congratulation, You Got Selected.",get_html_message(journalist.name))
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
        

            const get_html_message = (userName) => {
                return `
                    <p>Dear, <b>${userName}</b></p>
                    </br>
                    <p>Sorry! We are sorry You not selected for journalist role in Mern-MediaHouse.</p>
                    <p>You Can Try Again, Make Your Resume Strong.</p>
                    </br>
                    </br>
                    <a href="http://localhost:8080/api/v2/auth/journalist/register" target="_blank"><button style="padding:10px 30px; border:none; outline: none; cursor: pointer; border-radius: 2px; background:crimson; color:#fff;">Login</button></a>
                    </br>
                    </br>
                    </br>
                    <h2>Thank You</h3>
                 `
            }
           
            nodeMailSender(journalist.email,"Mern-MediaHouse : Sorry, You Are Not Selected.",get_html_message(journalist.name));
            await Journalist.deleteOne({_id: req.params.id}).then(() => {
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