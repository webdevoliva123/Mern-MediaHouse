const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../middlewares/generateToken");
const bycrpt = require("bcryptjs");
const Blog = require("../models/blogModel");
const Journalist = require("../models/jounModel");
const nodeMailSender = require("../middlewares/mailSender");
const JWT = require('jsonwebtoken');


// User Register
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password} = req.body;


    const userExist = await User.findOne({ email });
    if (userExist) {
       return res.status(401).json({
           success : false,
           error : "User Already Register"
       })
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

            const get_html_message = (userName) => {
                return `
                    <p>Dear, <b>${userName}</b></p>
                    </br>
                    <p>Congratulations! You have successfully registered on the Mern-MediaHouse.</p>
                    <p>Go Login Your Account & See latest blog. Know Everything About World!!</p>
                    </br>
                    <a href="http://localhost:8080/api/v1/auth/login" target="_blank"><button style="padding:10px 30px; border:none; outline: none; cursor: pointer; border-radius: 2px; background:crimson; color:#fff;">Login</button></a>
                    </br>
                    </br>
                    <h2>Thank You</h3>
                 `
            }
           
            nodeMailSender(email,"Mern-MediaHouse : Registration Successfull. ",get_html_message(name))
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
        return res.status(401).json({
            success : false,
            error : "Invalid email or password"
        })
    }
});


// Forget Password
const forgetPasswordUser = asyncHandler(async (req,res,next) => {
    const {email} = req.body

    const user = await User.findOne({email});

    if(user){
        // genrate one time link
        const secreteKey = process.env.JWT_KEY + user.password;
        // create payload
        const payload = {
            email : user.email,
            id : user.id
        }
        // genarate token
        const token = JWT.sign(payload,secreteKey,{expiresIn : '15m'});
        // genarte link
        const link = `http://localhost:8080/api/v1/user/resetPassword/${user.id}/${token}`

        const get_html_message = (userName) => {
            return `
                <p>Dear, <b>${userName}</b></p>
                </br>
                <p>Your Password Recovery Link Successfully Ganerate : </p>
                <p>${link}</p>
                <h2>Thank You</h3>
             `
        }
        
        nodeMailSender(email,"Mern-MediaHouse : Password Recovery Link.",get_html_message(user.name));

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

// recovery page auth
const authForResetPassPage = asyncHandler(async  (req,res) => {
    const {id,token} = req.body;

    const user = await User.findById(id);

    if(user){
        const secert = process.env.JWT_KEY + user.password
        
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
const resetPassword = asyncHandler(async (req,res) => {
    const {id,token} = req.params;
    const {newPassword} = req.body;
    const user = await User.findById(id);

    if(user){
        const secert = process.env.JWT_KEY + user.password
        
        const userAuth =  JWT.verify(token,secert);

        if(userAuth){
            const hashedPassword = await bycrpt.hash(newPassword,5);
           const updatePassword =  await User.findByIdAndUpdate(id,{$set : {password : hashedPassword}});
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
        const bloglikesData = blog.likes;
        const userLikeData =  user.likedBlogs

        const blogAlreadyLiked = bloglikesData.filter((e) => {
            if(e === userId){
                return e
            }
        })
        
        const userAlreadyLiked = userLikeData.filter((e) => {
            if(e === blogId){
                return e
            }
        })


       const isBlogAlreadyLiked = blogAlreadyLiked.length <= 0 ? true : false;
       const isUserAlreadyLiked = userAlreadyLiked.length <= 0 ? true : false;
        if(isBlogAlreadyLiked && isUserAlreadyLiked){
            try {
                await Blog.updateOne({_id : Object(blogId)},{$push : {likes : userId}})
                await User.updateOne({_id : Object(userId)},{$push : {likedBlogs : blogId}})

                res.status(200).json({
                    success : true,
                    message : "Blog found & liked",
                })
    
                Blog.save();
                User.save();
            } catch{
                return res.status(400).json({
                    success : false,
                    error : "Blog not found",
                })
            }
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
        const bloglikesData = blog.likes;
        const userLikeData =  user.likedBlogs

        const blogAlreadyLiked = bloglikesData.filter((e) => {
            if(e === userId){
                return e
            }
        })
        
        const userAlreadyLiked = userLikeData.filter((e) => {
            if(e === blogId){
                return e
            }
        })

       const isBlogAlreadyLiked = blogAlreadyLiked.length > 0 ? true : false;
       const isUserAlreadyLiked = userAlreadyLiked.length > 0 ? true : false;
        if(isBlogAlreadyLiked && isUserAlreadyLiked){
            try {
            await Blog.updateOne({_id : Object(blogId)},{$pull : {likes : userId}})
            await User.updateOne({_id : Object(userId)},{$pull : {likedBlogs : blogId}})
            res.status(200).json({
                success : true,
                message : "Blog found & removeLiked",
            })

            Blog.save();
            User.save();

            } catch{
                return res.status(400).json({
                    success : false,
                    error : "Blog not found",
                }) 
            }
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

// Subscribe To Jurnalist
const subscribeToJoun = asyncHandler(async (req,res) => {
    const {jounId,userId} = req.body;

    const user = await User.findById(userId);

    if(user){
        const journalist = await Journalist.findById(jounId);
        const jounSubscribeData = journalist.subscribe;
        const userSubscribeData = user.subscribed;

        const jounAlreadySubscribe = jounSubscribeData.filter((e) => {
            if(e === userId){
                return e
            }
        })
        
        const userAlreadySubscribe = userSubscribeData.filter((e) => {
            if(e === jounId){
                return e
            }
        })

        const isJounAlreadySubscribe = jounAlreadySubscribe.length <= 0 ? true : false;
        const isUserAlreadySubscribe = userAlreadySubscribe.length <= 0 ? true : false;

        if(isJounAlreadySubscribe && isUserAlreadySubscribe){
            try {
                await Journalist.updateOne({_id : jounId},{$push : {subscribe : userId}})
                await User.updateOne({_id : userId},{$push : {subscribed : jounId}})

                res.status(200).json({
                    success : true,
                    message : "Joun found & subscribed",
                })
    
                Journalist.save();
                User.save();
            } catch{
                return res.status(400).json({
                    success : false,
                    error : "Joun not found",
                })
            }
        }else{
            return res.status(400).json({
                success : false,
                error : "user already subscribe to this joun",
            })
        }

        
    }else{
        return res.status(404).json({
            success : false,
            error : "User is aunthorized"
        })
    }   

})

// Unsubscribe To Jurnalist
const unSubscribeToJun = asyncHandler(async (req,res) => {
    const {jounId,userId} = req.body;

    const user = await User.findById(userId);

    if(user){
        const journalist = await Journalist.findById(jounId);
        const jounSubscribeData = journalist.subscribe;
        const userSubscribeData = user.subscribed;

        const jounAlreadySubscribe = jounSubscribeData.filter((e) => {
            if(e === userId){
                return e
            }
        })
        
        const userAlreadySubscribe = userSubscribeData.filter((e) => {
            if(e === jounId){
                return e
            }
        })

        const isJounAlreadySubscribe = jounAlreadySubscribe.length > 0 ? true : false;
        const isUserAlreadySubscribe = userAlreadySubscribe.length > 0 ? true : false;
        if(isJounAlreadySubscribe && isUserAlreadySubscribe){
            try {
                await Journalist.updateOne({_id : jounId},{$pull : {subscribe : userId}})
                await User.updateOne({_id : userId},{$pull : {subscribed : jounId}})  

                res.status(200).json({
                    success : true,
                    message : "Joun found & unsubscribe",
                })
    
                Journalist.save();
                User.save();
            } catch{
                return res.status(400).json({
                    success : false,
                    error : "Joun not found",
                })
            }
        }else{
            return res.status(400).json({
                success : false,
                error : "joun is already unsubscribe",
            })
        }

    }else{
        return res.status(404).json({
            success : false,
            error : "User is aunthorized"
        })
    }
})

// save Blog
const saveBlog = asyncHandler(async (req,res) => {
    const blogId = req.params.id;
    const { userId } =  req.body
    const user = await User.findById(userId);

    if(user){
        const savedBlog = []
        user.saveBlogs.map((e) => {
            if(e === blogId){
                saveBlog.push(e)
            }
        })

        if(savedBlog.length <= 0){
            try {
                await User.updateOne({id : Object(blogId)},{$push : {saveBlogs : blogId}})
                return res.status(200).json({
                    success : true,
                    message : "blog Saved"
                })
            } catch (error) {
                console.log(error);
            }
        }else{
            return res.status(401).json({
                success : false,
                message : "Blog Is Already Saved"
            })
        }

    }else{
        return res.status(404).json({
            success : false,
            message : "User Not Found"
        })
    }

})

// unsave Blog
const unsaveBlog = asyncHandler(async (req,res) => {
    const blogId = req.params.id;
    const { userId } =  req.body
    const user = await User.findById(userId);

    if(user){
        const alreadySavedBlog = user.saveBlogs.map((e) => {
            if(e === blogId){
                return e
            }
        })

        if(alreadySavedBlog.length > 0){
            try {
                await User.updateOne({id : Object(blogId)},{$pull : {saveBlogs : blogId}})
                return res.status(200).json({
                    success : true,
                    message : "blog unsaved"
                })
            } catch (error) {
                console.log(error);
            }
        }else{
            return res.status(401).json({
                success : false,
                message : "Blog Is Already unSaved"
            })
        }

    }else{
        return res.status(404).json({
            success : false,
            message : "User Not Found"
        })
    }

})


module.exports = { registerUser,
     userLogin,
     updateUserAavatar,
     updateUserName ,
     updateUserEmail,
     updateUserPassword ,
     userLikeBlog,
     userRemoveLikeFromBlog ,subscribeToJoun ,
     unSubscribeToJun,
     forgetPasswordUser,
     authForResetPassPage,
     resetPassword,
     saveBlog,
     unsaveBlog
    };