const jwt = require('jsonwebtoken');
require("dotenv").config()
const SECRET_KEY = process.env.KEY_TOKEN;

const generateToken = (res, id, username )=>{
    const exiration = 604800000;
    const token = jwt.sign({id, username}, SECRET_KEY, {
        expiresIn: '7d'
    });
    return res.cookie('token', token, {
        expires: new Date(Date.now() + exiration),
        secure: false, // set to true if your using https
        httpOnly: true,
    }).send();
}

module.exports = generateToken;