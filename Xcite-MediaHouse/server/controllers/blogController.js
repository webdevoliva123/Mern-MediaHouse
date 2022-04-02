const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");
const Journalist = require("../models/jounModel");

// Get blogs by tags
const getBlogByTag = asyncHandler(async (req,res) => {
    const Blogs = await Blog.find({ tags : req.params.search });

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
}) 


// Get 6 latest blogs
const get6LatestBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({});
    if (Blogs.length > 0) {

        const latestBlog = [];

        for(let i = 0; i<6; i++){
            latestBlog.push(Blogs[Blogs.length - (i+1)])
        }

        res.status(200).json({
            success: true,
            data: latestBlog,
        });

    } else {
        res.status(200).json({
            success: false,
            error: "No Blog found",
        });
    }
});

// Get 4 latest news blogs
const get4LatestNewsBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{type : "news"},{type : "News"}]});

    const latestBlog = [];

        for(let i = 0; i<4; i++){
            latestBlog.push(Blogs[Blogs.length - (i+1)])
        }

    if (Blogs.length > 0) {
        res.status(200).json({
            success : true,
            data : latestBlog
        });
    } else {
        return res.status(404).json({
            success: false,
            error: "No Blog found",
        });
    }
});


// Get 4 latest business blogs
const get4LatestBusinessBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{ type: "business"},{type : "Business" }]});

    const latestBlog = [];

        for(let i = 0; i<4; i++){
            latestBlog.push(Blogs[Blogs.length - (i+1)])
        }

    if (Blogs.length > 0) {
        res.status(200).json({
            success : true,
            data : latestBlog
        });
    } else {
        return res.status(404).json({
            success: false,
            error: "No Blog found",
        });
    }
});


// Get 4 latest sociology blogs
const get4LatestSociologyBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{ type: "sociology"},{type : "Sociology" }]});

    const latestBlog = [];

        for(let i = 0; i<4; i++){
            latestBlog.push(Blogs[Blogs.length - (i+1)])
        }

    if (Blogs.length > 0) {
        res.status(200).json({
            success : true,
            data : latestBlog
        });
    } else {
        return res.status(404).json({
            success: false,
            error: "No Blog found",
        });
    }
});


// Get 4 latest tech blogs
const get4LatestTechBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{ type: "tech"},{type : "Tech" }]});

    const latestBlog = [];

        for(let i = 0; i<4; i++){
            latestBlog.push(Blogs[Blogs.length - (i+1)])
        }

    if (Blogs.length > 0) {
        res.status(200).json({
            success : true,
            data : latestBlog
        });
    } else {
        return res.status(404).json({
            success: false,
            error: "No Blog found",
        });
    }
});

// Get 4 latest economic blogs
const get4LatestEconomicBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{ type: "economic"},{type : "Economic" }]});

    const latestBlog = [];

        for(let i = 0; i<4; i++){
            latestBlog.push(Blogs[Blogs.length - (i+1)])
        }

    if (Blogs.length > 0) {
        res.status(200).json({
            success : true,
            data : latestBlog
        });
    } else {
        return res.status(404).json({
            success: false,
            error: "No Blog found",
        });
    }
});

// Get 4 latest other blogs
const get4LatestOtherBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{ type: "Other" },{ type: "other" },{ type: "Others" },{ type: "others" }]});

    const latestBlog = [];

        for(let i = 0; i<4; i++){
            latestBlog.push(Blogs[Blogs.length - (i+1)])
        }

    if (Blogs.length > 0) {
        res.status(200).json({
            success : true,
            data : latestBlog
        });
    } else {
        return res.status(404).json({
            success: false,
            error: "No Blog found",
        });
    }
});



// Get latest all Blogs
const getAllBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({});
    if (Blogs.length > 0) {

        const latestBlog = [];

        for(let i = 0; i< Blogs.length; i++){
            let data = {};
            const jounInfo = await Journalist.findById(Blogs[Blogs.length - (i+1)].jounId);
            data = {blogInfo : Blogs[Blogs.length - (i+1)] , jounInfo : {_id :jounInfo._id ,avatar : jounInfo.profilePicture,name : jounInfo.name}};
            latestBlog.push(data);
        }

        res.status(200).json({
            success: true,
            data: latestBlog,
        });

    } else {
        return res.status(200).json({
            success: false,
            error: "No Blog found",
        });
    }
});

// Get details of all News Blog
const getAllNewsBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{type : "news"},{type : "News"}]});

    const latestBlog = [];

        for(let i = 0; i< Blogs.length; i++){
            let data = {};
            const jounInfo = await Journalist.findById(Blogs[Blogs.length - (i+1)].jounId);
            data = {blogInfo : Blogs[Blogs.length - (i+1)] , jounInfo : {_id :jounInfo._id ,avatar : jounInfo.profilePicture,name : jounInfo.name}};
            latestBlog.push(data);
        }

    if (Blogs.length > 0) {
        res.status(200).json({
            success : true,
            data : latestBlog
        });
    } else {
        return res.status(404).json({
            success: false,
            error: "No Blog found",
        });
    }
});


// Get all business Blogs
const getAllBusinessBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{ type: "business"},{type : "Business" }]});

    const latestBlog = [];

        for(let i = 0; i< Blogs.length; i++){
            let data = {};
            const jounInfo = await Journalist.findById(Blogs[Blogs.length - (i+1)].jounId);
            data = {blogInfo : Blogs[Blogs.length - (i+1)] , jounInfo : {_id :jounInfo._id ,avatar : jounInfo.profilePicture,name : jounInfo.name}};
            latestBlog.push(data)
        }

    if (Blogs.length > 0) {
        res.status(200).json({
            success : true,
            data : latestBlog
        });
    } else {
        return res.status(404).json({
            success: false,
            error: "No Blog found",
        });
    }
});

// Get all sociology blogs
const getAllSociologyBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{ type: "Sociology" },{ type: "sociology" }]});

    const latestBlog = [];

        for(let i = 0; i< Blogs.length; i++){
            let data = {};
            const jounInfo = await Journalist.findById(Blogs[Blogs.length - (i+1)].jounId);
            data = {blogInfo : Blogs[Blogs.length - (i+1)] , jounInfo : {_id :jounInfo._id ,avatar : jounInfo.profilePicture,name : jounInfo.name}};
            latestBlog.push(data);
        }

    if (Blogs.length > 0) {
        res.status(200).json({
            success : true,
            data : latestBlog
        });
    } else {
        return res.status(404).json({
            success: false,
            error: "No Blog found",
        });
    }
});

// Get all tech blogs
const getAllTechBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{ type: "Tech" },{type : "tech"}]});

    const latestBlog = [];

    for(let i = 0; i< Blogs.length; i++){
        let data = {};
            const jounInfo = await Journalist.findById(Blogs[Blogs.length - (i+1)].jounId);
            data = {blogInfo : Blogs[Blogs.length - (i+1)] , jounInfo : {_id :jounInfo._id ,avatar : jounInfo.profilePicture,name : jounInfo.name}};
            latestBlog.push(data);
    }

    if (Blogs.length > 0) {
        res.status(200).json({
            success : true,
            data : latestBlog
        });
    } else {
        return res.status(404).json({
            success: false,
            error: "No Blog found",
        });
    }
});


// Get all lastest economic blogs
const getAllEconomicBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{ type: "Economic" },{ type: "economic" }]});

    const latestBlog = [];

    for(let i = 0; i< Blogs.length; i++){
        let data = {};
            const jounInfo = await Journalist.findById(Blogs[Blogs.length - (i+1)].jounId);
            data = {blogInfo : Blogs[Blogs.length - (i+1)] , jounInfo : {_id :jounInfo._id ,avatar : jounInfo.profilePicture,name : jounInfo.name}};
            latestBlog.push(data);
    }

    if (Blogs.length > 0) {
        res.status(200).json({
            success : true,
            data : latestBlog
        });
    } else {
        return res.status(404).json({
            success: false,
            error: "No Blog found",
        });
    }
});

// get all lastest other blogs
const getAllOtherBlogs = asyncHandler(async (req, res) => {
    const Blogs = await Blog.find({$or : [{ type: "Other" },{ type: "other" },{ type: "Others" },{ type: "others" }]});

    const latestBlog = [];

    for(let i = 0; i< Blogs.length; i++){
        let data = {};
            const jounInfo = await Journalist.findById(Blogs[Blogs.length - (i+1)].jounId);
            data = {blogInfo : Blogs[Blogs.length - (i+1)] , jounInfo : {_id :jounInfo._id ,avatar : jounInfo.profilePicture,name : jounInfo.name}};
            latestBlog.push(data);
    }

    if (Blogs.length > 0) {
        res.status(200).json({
            success : true,
            data : latestBlog
        });
    } else {
        return res.status(404).json({
            success: false,
            error: "No Blog found",
        });
    }
});

// Get blog by blog id
const getBlogById = asyncHandler(async (req, res) => {
    const foundBlog = await Blog.findById(req.params.id);
    const userId = req.userId;
    if (foundBlog) {
        const journalist = await Journalist.findById(foundBlog.jounId);
        
        const subs = [];
        const liked = [];
        
        // Check If user Subscribed This Blog Or Not
        journalist.subscribe.map((e) => {
            if(e === userId){
                subs.push(e)
            }
        })

        // Check If user Liked This Blog Or Not
        foundBlog.likes.map((e) => {
            if(e === userId){
                liked.push(e);
            }
        })

        const data = {blogInfo : {foundBlog, thieUserLiked : subs.length > 0 ? true : false } ,jounInfo : {avatar : journalist.profilePicture,name : journalist.name, subscriber : journalist.subscribe.length, thisUserSubscribed : liked.length > 0 ? true : false}}
        res.status(200).json({
            success: true,
            data
        });
    } else {
        return res.status(404).json({
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
        return res.status(404).json({
            success: false,
            error: "No Blog found",
        });
    }
});

module.exports = {
    getBlogByTag,
    get6LatestBlogs,
    get4LatestNewsBlogs,
    get4LatestBusinessBlogs,
    get4LatestSociologyBlogs,
    get4LatestTechBlogs,
    get4LatestEconomicBlogs,
    get4LatestOtherBlogs,
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