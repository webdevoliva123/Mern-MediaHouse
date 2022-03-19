const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../middlewares/generateToken");

// User Register
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password} = req.body;


    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(404);
        throw new Error("User already exists");
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
           
        } else {
            res.status(404);
            throw new Error("User not created");
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
        res.status(404);
        throw new Error("Invalid email or password.");
    }
});


module.exports = { registerUser, userLogin };