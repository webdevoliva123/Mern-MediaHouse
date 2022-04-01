const asyncHandler = require("express-async-handler");
const Journalist = require('../models/jounModel');
const bycrpt = require('bcryptjs');
const generateToken = require("../middlewares/generateToken");
const Blog = require("../models/blogModel");
const nodeMailSender = require("../middlewares/mailSender");
const JWT = require('jsonwebtoken')


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

            const get_html_message = (userName) => {
                return `
                    <p>Dear, <b>${userName}</b></p>
                    </br>
                    <p>Thank You! You have Applied for Journalist Role In Mern-MediaHouse.</p>
                    <p>You will get to know in 24hr, if You got selected as journlist role</p>
                    </br>
                    </br>
                    <h2>Thank You</h3>
                 `
            }
           
            nodeMailSender(email,"Mern-MediaHouse : Applied Successfull. ",get_html_message(name))
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

// Get Journalist name By Id
const getJounById = asyncHandler(asyncHandler (async(req,res) => {
    const jounId = req.params.id
    const journalist = await Journalist.findById(jounId);

    if (Journalist) {
        res.status(200).json({
            success: true,
            data: 
            {
                id : journalist._id,
                name : journalist.name,
                email : journalist.email,
                avatar : journalist.profilePicture
            },
        });
    } else {
        return res.status(404).json({
            success: false,
            error: "No Journalist Found",
        });
    }
}))

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

// Update Blog Of Joun
const updateBlogOfJounByJoun = asyncHandler(async(req,res) => {
    const {jounId,blogId,currentPassword,title,description,body,tags,type} = req.body;

    const journalist = await Journalist.findById(jounId);

    if(journalist.isjournalist){
        const blog = await Blog.findById(blogId);
        if(blog.jounId.toString() === jounId){
            const passwordMatched = await bycrpt.compare(currentPassword,journalist.password);
            if(passwordMatched){
                if(title){
                    await Blog.findByIdAndUpdate(blogId,{title});
                }

                if(description){
                    await Blog.findByIdAndUpdate(blogId,{description});
                }

                if(body){
                    await Blog.findByIdAndUpdate(blogId,{body});
                }

                if(tags) {
                    await Blog.findByIdAndUpdate(blogId,{tags});
                }

                if(type) {
                    await Blog.findByIdAndUpdate(blogId,{type});
                }


                res.status(200).json({
                    success : true,
                    message : "Blog Edited !"
                })
                
            }else{
                return res.status(404).json({
                    success: false,
                    error: "Joun is not authorized!",
                });
            }
        }
    }else{
        return res.status(404).json({
            success: false,
            error: "Joun is not authorized!",
        });
    }

})


// Get Total No. Of Jurnalist Blog
const totalBlogOfJoun = asyncHandler(async (req,res) => {
    const {jounId} = req.body;

    const journalist = await Journalist.findById(jounId);

    if(journalist){
        const jounBlog = await Blog.find({jounId});

        res.status(200).json({
            success : true,
            message : jounBlog.length
        })
    }else{
        return res.status(404).json({
            success : false,
            error : "Joun Not Found"
        })
    }

})

// Get Total No. Of Jurnalist Blog
const totalLikeOfJoun = asyncHandler(async (req,res) => {
    const {jounId} = req.body;

    const journalist = await Journalist.findById(jounId);

    if(journalist){
        const jounBlog = await Blog.find({jounId});
        let totalLike = 0;

        jounBlog.map((e) => {
            totalLike += e.likes.length
        })

        res.status(200).json({
            success : true,
            message : totalLike
        })
        
    }else{
        return res.status(404).json({
            success : false,
            error : "Joun Not Found"
        })
    }

})

// Get Total No. Of Jurnalist Blog
const totalSubsOfJoun = asyncHandler(async (req,res) => {
    const {jounId} = req.body;

    const journalist = await Journalist.findById(jounId);

    if(journalist){
        res.status(200).json({
            success : true,
            message : journalist.subscribe.length
        })
        
    }else{
        return res.status(404).json({
            success : false,
            error : "Joun Not Found"
        })
    }

})

// Forget Password Of Journalist
const forgetPasswordJoun = asyncHandler(async (req,res,next) => {
    const {email} = req.body

    const journalist = await Journalist.findOne({email});

    if(journalist){
        // genrate one time link
        const secreteKey = process.env.JWT_KEY + journalist.password;
        // create payload
        const payload = {
            email : journalist.email,
            id : journalist.id
        }
        // genarate token
        const token = JWT.sign(payload,secreteKey,{expiresIn : '15m'});
        // genarte link
        const link = `http://localhost:8080/api/v2/joun/resetPassword/${journalist.id}/${token}`

        const get_html_message = (userName) => {
            return `
                <p>Dear, <b>${userName}</b></p>
                </br>
                <p>Your Password Recovery Link Successfully Ganerate : </p>
                <p>${link}</p>
                <h2>Thank You</h3>
             `
        }
        
        nodeMailSender(email,"Mern-MediaHouse : Password Recovery Link.",get_html_message(journalist.name));

        res.status(200).json({
            success : true,
            message : "Your Recovery Link Send on Your Email Id"
        })

    }else{
        return res.status(404).json({
            success : false,
            error : `User Not Register`
        })
    }

})

// recovery page auth of journalist
const authForResetPassPageJoun = asyncHandler(async  (req,res) => {
    const {id,token} = req.body;

    const journalist = await Journalist.findById(id);

    if(journalist){
        const secert = process.env.JWT_KEY + journalist.password
        
        const userAuth =  JWT.verify(token,secert);
        

        if(userAuth){
            res.status(200).json({
                success : true,
                message : 'User Authorized'
            })
        }else{
            return res.status(200).json({
                success: false,
                error : 'User UnAuthorized'
            })
        }

    }else{
        res.send(`User Aunthorized`)
    }
})

// Reset Password
const resetPasswordJoun = asyncHandler(async (req,res) => {
    const {id,token} = req.params;
    const {newPassword} = req.body;
    const journalist = await Journalist.findById(id);

    if(journalist){
        const secert = process.env.JWT_KEY + journalist.password
        
        const userAuth =  JWT.verify(token,secert);

        if(userAuth){
            const hashedPassword = await bycrpt.hash(newPassword,5);
           const updatePassword =  await Journalist.findByIdAndUpdate(id,{$set : {password : hashedPassword}});
            res.status(200).json({
                success : true,
                message : `Password Has Update to : ${updatePassword}`
            })
        }else{
            return res.status(200).json({
                success: false,
                error : 'User UnAuthorized'
            })
        }

    }else{
        res.send(`User Aunthorized`)
    }
})

module.exports = { 
    jounRegister, 
    jounLogin, 
    updateJounName , 
    updateJounAvatar , 
    getJounByName , 
    getJounById,
    updateJounEmail , 
    updateJounPassword , 
    getAllBlogsOfJounById, 
    updateBlogOfJounByJoun, 
    totalBlogOfJoun,
    totalLikeOfJoun,
    totalSubsOfJoun,
    forgetPasswordJoun,
    authForResetPassPageJoun,
    resetPasswordJoun
}