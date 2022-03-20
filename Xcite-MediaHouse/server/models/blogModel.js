const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
    {
        jounId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            default: "other"
        },
        tags : [
            {
                type: String,
                default : "news"
            }
        ],
        likes : [
            {
                type : String,
            }
        ],
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);


const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
