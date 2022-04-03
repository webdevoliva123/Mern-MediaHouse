const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            defualt: "user description"
        },
        profilePicture: {
            type: String,
            required: true,
            default:
                "https://res.cloudinary.com/xciteeducation/image/upload/v1647730586/extra%20images/avatar_a9s6j6.jpg",
        },
        subscribed : [
            {
                type : String,
                required : true
            }
        ],
        likedBlogs : [
            {
                type : String,
                required : true
            }
        ],
        saveBlogs : [
            {
                type : String,
                required : true
            }
        ]
    },
    {
        timestamps: true,
    }
);

userSchema.methods.matchPassword = async function (enterredPassword) {
    return await bcrypt.compare(enterredPassword, this.password);
};

// Middleware for hashing password
// pre => before saving the user in the database
userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(5);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
