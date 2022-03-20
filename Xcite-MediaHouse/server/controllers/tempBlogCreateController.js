const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");

// create blog
const createBlog = asyncHandler(async (req, res) => {
    const {userId,title,type,tags,image,description,body} = req.body;
    await Blog.create({
        userId,
        title,
        type,
        tags,
        image,
        description,
        body
    }).then((data) => {
        res.status(200).json({
            success : true,
            message : "Blog Created Succefully",
            data
        })
    }).catch((err) => {
        console.log(`Error : ${err}`);
    })
})


module.exports = createBlog