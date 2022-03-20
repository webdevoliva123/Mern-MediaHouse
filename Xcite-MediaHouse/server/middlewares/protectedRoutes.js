const jwttoken = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");


// Verify Token
const protected = asyncHandler(async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwttoken.verify(token,process.env.JWT_KEY);
        
        if(decoded){
            res.status(200).json({
                success : true,
                message : "User Is Authorized!"
            })
        }
        
    } catch (error) {
        return res.status(401).send("Invalid Token");
    }

    return next();
});


module.exports = protected