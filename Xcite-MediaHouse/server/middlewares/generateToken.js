const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_KEY,{expiresIn : "24h"});
};

module.exports = generateToken;