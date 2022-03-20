const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");

// Get all Blogs
const getAllBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({});
    if (Blogs.length > 0) {

        const latestBlog = [];

        for(let i = 0; i< Blogs.length; i++){
            latestBlog.push(Blogs[Blogs.length - (i+1)])
        }

        res.status(200).json({
            success: true,
            data: latestBlog,
        });

    } else {
        res.status(200).json({
            success: false,
            data: "No Blog found",
        });
    }
});

// Get details of all News Blog
const getAllNewsBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{type : "news"},{type : "News"}]});

    const latestBlog = [];

        for(let i = 0; i< Blogs.length; i++){
            latestBlog.push(Blogs[Blogs.length - (i+1)])
        }

    if (Blogs.length > 0) {
        res.status(200).json(latestBlog);
    } else {
        res.status(404).json({
            message: "No News Blog found",
        });
    }
});


// Get all business Blogs
const getAllBusinessBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{ type: "business"},{type : "Business" }]});

    const latestBlog = [];

        for(let i = 0; i<= Blogs.length; i++){
            latestBlog.push(Blogs[Blogs.length - (i+1)])
        }

    if (Blogs.length > 0) {
        res.status(200).json(latestBlog);
    } else {
        res.status(404).json({
            message: "No Business Blog found",
        });
    }
});

// Get all sociology blogs
const getAllSociologyBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{ type: "Sociology" },{ type: "sociology" }]});

    const latestBlog = [];

        for(let i = 0; i< Blogs.length; i++){
            latestBlog.push(Blogs[Blogs.length - (i+1)])
        }

    if (Blogs.length > 0) {
        res.status(200).json(latestBlog);
    } else {
        res.status(404).json({
            message: "No Sociology Blog found",
        });
    }
});

// Get all tech blogs
const getAllTechBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{ type: "Tech" },{type : "tech"}]});

    const latestBlog = [];

    for(let i = 0; i< Blogs.length; i++){
        latestBlog.push(Blogs[Blogs.length - (i+1)])
    }

    if (Blogs.length > 0) {
        res.status(200).json(latestBlog);
    } else {
        res.status(404).json({
            message: "No Tech Blog found",
        });
    }
});


// Get all lastest economic blogs
const getAllEconomicBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{ type: "Economic" },{ type: "economic" }]});

    const latestBlog = [];

    for(let i = 0; i< Blogs.length; i++){
        latestBlog.push(Blogs[Blogs.length - (i+1)])
    }

    if (Blogs.length > 0) {
        res.status(200).json(latestBlog);
    } else {
        res.status(404).json({
            message: "No Economic Blog found",
        });
    }
});

// get all lastest other blogs
const getAllOtherBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{ type: "Other" },{ type: "other" },{ type: "Others" },{ type: "others" }]});

    const latestBlog = [];

    for(let i = 0; i< Blogs.length; i++){
        latestBlog.push(Blogs[Blogs.length - (i+1)])
    }

    if (Blogs.length > 0) {
        res.status(200).json(latestBlog);
    } else {
        res.status(404).json({
            message: "No Other Blog found",
        });
    }
});

// Get blog by blog id
const getBlogById = asyncHandler(async (req, res) => {
    const foundBlog = await Blog.findById(req.params.id);
    if (foundBlog) {
        res.status(200).json({
            success: true,
            data: foundBlog,
        });
    } else {
        res.status(404).json({
            success: false,
            error: "No Blog found",
        });
    }
});

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
        res.status(404).json({
            success: false,
            error: "No Blog found",
        });
    }
});

module.exports = {
    getAllBlogs,
    getAllBusinessBlogs,
    getAllNewsBlogs,
    getAllSociologyBlogs,
    getAllTechBlogs,
    getAllEconomicBlogs,
    getAllOtherBlogs,
    getBlogById,
    getAllBlogsOfJounById
};