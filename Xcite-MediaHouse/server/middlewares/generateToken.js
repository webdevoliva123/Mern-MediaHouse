const jwttoken = require("jsonwebtoken");

const generateToken = (id) => {
    return jwttoken.sign({id},process.env.JWT_KEY,{expiresIn : "24h"});
};

module.exports = generateToken;