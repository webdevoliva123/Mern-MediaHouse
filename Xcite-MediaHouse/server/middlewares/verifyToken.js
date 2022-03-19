const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");


// Verify Token
const verify = asyncHandler(async (req, res, next) => {
    var token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_KEY);

            req.user = await User.findById(decode.id);
           
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token found");
    }

    next();
});


module.exports = verify