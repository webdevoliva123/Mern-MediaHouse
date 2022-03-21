const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
const Jounarlist = require("../models/jounModel");

// create blog
const createBlog = asyncHandler(async (req, res) => {
    const {jounId,title,type,tags,image,description,body} = req.body;

    const journalist =  await Jounarlist.findById(jounId);
    if(journalist){
        if(journalist.isjournalist){
            await Blog.create({
                image,
                title,
                description,
                body,
                type,
                tags,
                jounId
            }).then((blog) => {
                res.status(200).json({
                    success : true,
                    message : "Blog is Created Successfully!",
                    blog
                })
            })

        }else{
            return res.status(400).json({
                success : false,
                error : "Journalist in not authorized."
            })
        }
    

    }else{
        return res.status(400).json({
            success : false,
            error : "Journalist in not authorized."
        })
    }

   
})


module.exports = createBlog