let jwt = require("jsonwebtoken");
const secret = "myBigSecret";

function createToken(data) {
    return jwt.sign(data, secret, { expiresIn: "2d" });
}

module.exports = {
    createToken
};